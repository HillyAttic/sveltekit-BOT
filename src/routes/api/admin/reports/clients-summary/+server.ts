import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

export const GET: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const db = getFirestore()

    const usersSnap = await db.collection('users').get()
    const clients = usersSnap.docs.map((d) => {
      const data = d.data()
      return {
        id: d.id,
        name: (data.name as string) || 'Unnamed Client',
        phones: (data.phones as string[]) || (data.phone ? [data.phone as string] : []),
        gstNumber: (data.gstNumber as string) || undefined,
        createdAt: (data.createdAt as string) || undefined,
      }
    })

    const docsSnap = await db.collection('documents').get()
    const docsByClient = new Map<string, { categories: Set<string>; total: number }>()

    for (const doc of docsSnap.docs) {
      const data = doc.data()
      const clientId = (data.clientId as string) || ''
      if (!clientId) continue
      if (!docsByClient.has(clientId)) {
        docsByClient.set(clientId, { categories: new Set(), total: 0 })
      }
      const bucket = docsByClient.get(clientId)!
      bucket.total += 1
      if (data.category) bucket.categories.add(data.category)
    }

    const rows = clients.map((c) => {
      const stats = docsByClient.get(c.id) || { categories: new Set<string>(), total: 0 }
      return {
        clientId: c.id,
        clientName: c.name,
        phoneCount: c.phones.length,
        phones: c.phones,
        gstNumber: c.gstNumber,
        categoryCount: stats.categories.size,
        categories: Array.from(stats.categories),
        documentCount: stats.total,
        createdAt: c.createdAt,
      }
    })

    rows.sort((a, b) => {
      if (b.documentCount !== a.documentCount) return b.documentCount - a.documentCount
      return a.clientName.localeCompare(b.clientName)
    })

    return json({ rows })
  } catch (error) {
    console.error('Error building clients summary:', error)
    return json({ error: 'Failed to build clients summary' }, { status: 500 })
  }
}
