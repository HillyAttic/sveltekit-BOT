import { getFirestore } from './firebase-admin'
import { normalizePhone } from './phone'
import { getSessionTimeoutMs } from './session-config'

/**
 * Chat session record — one per distinct user "visit" (from first message
 * to inactivity / explicit close). Documents use auto-generated IDs so
 * multiple sessions per phone are preserved.
 */
/** One transcript line: who said what, and when. */
export interface ChatFlowMessage {
  at: string
  from: 'user' | 'bot'
  /** Message body, capped to keep session docs small. */
  text: string
}

export interface ChatSessionLog {
  phone: string
  clientId?: string
  clientName?: string
  startedAt: string
  endedAt?: string
  durationMs?: number
  status: 'active' | 'completed'
  messageCount: number
  lastMessageAt: string
  /** Full transcript for one Hi → … → completion run, like chat.txt. */
  messages?: ChatFlowMessage[]
}

/**
 * Document access record — written every time the bot generates a signed
 * URL for a document and sends it to the user.
 */
export interface DocumentAccessLog {
  phone: string
  chatSessionId?: string
  clientId?: string
  clientName?: string
  documentId: string
  documentTitle: string
  category?: string
  fiscalYear?: string | null
  subCategory?: string | null
  accessedAt: string
  source: 'whatsapp' | 'admin'
}

/**
 * Find the active chat session document ID for a phone number.
 * Returns null if no active session exists.
 */
async function findActiveSessionId(phone: string): Promise<string | null> {
  const db = getFirestore()
  const normalized = normalizePhone(phone)
  const snap = await db
    .collection('chatSessions')
    .where('phone', '==', normalized)
    .where('status', '==', 'active')
    .orderBy('lastMessageAt', 'desc')
    .limit(1)
    .get()
  return snap.empty ? null : snap.docs[0].id
}

/**
 * Record one exchange (user message + bot reply) in the user's current flow.
 * A flow *only* starts when the user says Hi/Restart (startNew); anything else
 * without an active flow is ignored so stray messages never create phantom
 * sessions.
 *
 * Returns the chat session document ID, or null when nothing was recorded.
 */
export async function recordChatActivity(
  phone: string,
  activity: {
    messages: Array<{ from: 'user' | 'bot'; text: string }>
    startNew?: boolean
    clientId?: string
    clientName?: string
  }
): Promise<string | null> {
  try {
    const db = getFirestore()
    const normalized = normalizePhone(phone)
    const now = new Date()
    const nowIso = now.toISOString()
    const entries: ChatFlowMessage[] = activity.messages
      .filter((m) => m.text?.trim())
      .map((m) => ({ at: nowIso, from: m.from, text: m.text.slice(0, 2000) }))
    const userMessages = entries.filter((m) => m.from === 'user').length

    // Hi/restart closes the previous run and opens a fresh one — no need to
    // query for an active session afterwards, closeChatSession just ended it.
    if (activity.startNew) {
      await closeChatSession(normalized)
    } else {
      const activeSnap = await db
        .collection('chatSessions')
        .where('phone', '==', normalized)
        .where('status', '==', 'active')
        .orderBy('lastMessageAt', 'desc')
        .limit(1)
        .get()

      if (activeSnap.empty) return null

      const sessionDoc = activeSnap.docs[0]
      const data = sessionDoc.data() as ChatSessionLog
      const last = new Date(data.lastMessageAt).getTime()

      if (now.getTime() - last < (await getSessionTimeoutMs())) {
        // Append to the existing flow
        await sessionDoc.ref.update({
          lastMessageAt: nowIso,
          messageCount: (data.messageCount || 0) + userMessages,
          messages: [...(data.messages || []), ...entries],
          // Lock in the client if it was previously unknown
          ...(data.clientId ? {} : { clientId: activity.clientId, clientName: activity.clientName }),
        })
        return sessionDoc.id
      }

      // Stale active session — close it out; the next Hi starts a new flow.
      await closeChatSession(normalized)
      return null
    }

    // New flow with auto-generated ID
    const newSession: ChatSessionLog = {
      phone: normalized,
      clientId: activity.clientId,
      clientName: activity.clientName,
      startedAt: nowIso,
      status: 'active',
      messageCount: userMessages,
      lastMessageAt: nowIso,
      messages: entries,
    }
    const docRef = await db.collection('chatSessions').add(newSession)
    return docRef.id
  } catch (error) {
    // Logger must never break the bot — swallow errors with a console note
    console.error('[chat-logger] recordChatActivity failed:', error)
    return null
  }
}

/**
 * Mark the active chat session for a phone as completed. Safe to call when
 * there is no active session.
 */
export async function closeChatSession(phone: string): Promise<void> {
  try {
    const db = getFirestore()
    const normalized = normalizePhone(phone)

    const activeSnap = await db
      .collection('chatSessions')
      .where('phone', '==', normalized)
      .where('status', '==', 'active')
      .orderBy('lastMessageAt', 'desc')
      .limit(1)
      .get()

    if (activeSnap.empty) return

    const sessionDoc = activeSnap.docs[0]
    const data = sessionDoc.data() as ChatSessionLog
    const startedAt = new Date(data.startedAt).getTime()
    // End at the last real activity, not when the next Hi happens to arrive —
    // otherwise a flow left overnight looks days long.
    const endedAt = data.lastMessageAt || new Date().toISOString()

    await sessionDoc.ref.update({
      status: 'completed',
      endedAt,
      durationMs: Math.max(0, new Date(endedAt).getTime() - startedAt),
      lastMessageAt: endedAt,
    })
  } catch (error) {
    console.error('[chat-logger] closeChatSession failed:', error)
  }
}

/**
 * Record that a document was delivered to (or downloaded by) a user.
 * Each delivery is a separate log entry — useful for the
 * "doc report accessed" column in the report.
 */
export async function recordDocumentAccess(entry: DocumentAccessLog): Promise<void> {
  try {
    const db = getFirestore()
    const normalized = normalizePhone(entry.phone)

    // Resolve the active chat session ID for this phone
    const chatSessionId = await findActiveSessionId(normalized)

    const payload: DocumentAccessLog = {
      ...entry,
      phone: normalized,
      ...(chatSessionId ? { chatSessionId } : {}),
    }
    await db.collection('documentAccessLogs').add(payload)
  } catch (error) {
    console.error('[chat-logger] recordDocumentAccess failed:', error)
  }
}
