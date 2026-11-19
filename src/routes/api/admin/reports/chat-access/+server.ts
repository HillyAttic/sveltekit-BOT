import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000

export const GET: RequestHandler = async ({ request, url }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const db = getFirestore()
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '200', 10) || 200, 1000)

    const sessionsSnap = await db
      .collection('chatSessions')
      .orderBy('lastMessageAt', 'desc')
      .limit(limit)
      .get()

    const accessSnap = await db
      .collection('documentAccessLogs')
      .orderBy('accessedAt', 'desc')
      .limit(500)
      .get()

    const accessBySessionId = new Map<string, Array<{ title: string; at: string }>>()
    const accessByPhone = new Map<string, Array<{ title: string; at: string }>>()

    for (const d of accessSnap.docs) {
      const data = d.data()
      const phone = (data.phone as string) || ''
      if (!phone) continue

      const entry = {
        title: (data.documentTitle as string) || 'Untitled',
        at: (data.accessedAt as string) || '',
      }

      if (data.chatSessionId) {
        if (!accessBySessionId.has(data.chatSessionId)) accessBySessionId.set(data.chatSessionId, [])
        accessBySessionId.get(data.chatSessionId)!.push(entry)
      } else {
        if (!accessByPhone.has(phone)) accessByPhone.set(phone, [])
        accessByPhone.get(phone)!.push(entry)
      }
    }

    const clientCache = new Map<string, string>()
    async function resolveClientName(phone: string, fallback?: string): Promise<string | undefined> {
      if (fallback) return fallback
      if (clientCache.has(phone)) return clientCache.get(phone)
      const snap = await db
        .collection('users')
        .where('phones', 'array-contains', phone)
        .limit(1)
        .get()
      let name: string | undefined
      if (!snap.empty) {
        name = (snap.docs[0].data().name as string) || undefined
      } else {
        const legacy = await db
          .collection('users')
          .where('phone', '==', phone)
          .limit(1)
          .get()
        if (!legacy.empty) name = (legacy.docs[0].data().name as string) || undefined
      }
      clientCache.set(phone, name || '')
      return name
    }

    const rows: Array<{
      sessionId: string
      phone: string
      clientName: string
      date: string
      time: string
      timeTaken: string
      durationMs: number
      documentAccessed: string
      documentAccessCount: number
      status: string
      messageCount: number
      steps: Array<{ step: string; at: string; message?: string }>
      startedAt: string
      endedAt?: string
    }> = []

    for (const s of sessionsSnap.docs) {
      const data = s.data()
      const phone = (data.phone as string) || s.id
      const startedAt = new Date(data.startedAt || data.lastMessageAt)
      const sessionStartMs = startedAt.getTime()

      let docs = accessBySessionId.get(s.id) || []

      if (docs.length === 0 && phone) {
        const phoneDocs = accessByPhone.get(phone) || []
        const sessionEndMs = data.endedAt
          ? new Date(data.endedAt).getTime()
          : sessionStartMs + INACTIVITY_TIMEOUT_MS
        docs = phoneDocs.filter((d) => {
          const accessedAt = new Date(d.at).getTime()
          return accessedAt >= sessionStartMs && accessedAt <= sessionEndMs
        })
      }

      let timeTakenMs: number | null = null
      if (docs.length > 0) {
        const latestAccess = Math.max(...docs.map((d) => new Date(d.at).getTime()))
        timeTakenMs = latestAccess - sessionStartMs
      } else if (data.durationMs) {
        timeTakenMs = data.durationMs
      }

      const durationMs = timeTakenMs ?? data.durationMs ?? 0
      const distinctTitles = Array.from(new Set(docs.map((d) => d.title))).slice(0, 5)
      const clientName = (await resolveClientName(phone, data.clientName)) || 'Unknown'

      const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
      const istDate = new Date(sessionStartMs + IST_OFFSET_MS)
      const date = istDate.toISOString().slice(0, 10)
      const time = istDate.toISOString().slice(11, 19)

      rows.push({
        sessionId: s.id,
        phone,
        clientName,
        date,
        time,
        timeTaken: formatDuration(durationMs),
        durationMs,
        documentAccessed: distinctTitles.join(', ') || '—',
        documentAccessCount: docs.length,
        status: (data.status as string) || 'active',
        messageCount: (data.messageCount as number) || 0,
        steps: (data.steps as Array<{ step: string; at: string; message?: string }>) || [],
        startedAt: startedAt.toISOString(),
        endedAt: data.endedAt as string | undefined,
      })
    }

    return json({ rows })
  } catch (error) {
    console.error('Error building chat access report:', error)
    return json({ error: 'Failed to build chat access report' }, { status: 500 })
  }
}

function formatDuration(ms: number): string {
  if (!ms || ms < 0) return '—'
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`
  if (minutes > 0) return `${minutes}m ${seconds}s`
  return `${seconds}s`
}
