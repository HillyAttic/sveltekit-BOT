import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { clearLearningCache } from '#lib/learning-service'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

// Only these Firestore collections can be reached through the generic admin API.
const ALLOWED = new Set([
  'learningModules',
  'assessments',
  'questions',
  'scorecards',
  'certificates',
  'cities',
  'zones',
  'settings',
])

function allowed(collection: string): boolean {
  return ALLOWED.has(collection)
}

export const GET: RequestHandler = async ({ request, params }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)
  if (!allowed(params.collection)) return json({ error: 'Unknown collection' }, { status: 404 })

  try {
    const db = getFirestore()
    const snap = await db.collection(params.collection).get()
    return json(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  } catch (error) {
    console.error('Generic data GET failed:', error)
    return json({ error: 'Failed to load' }, { status: 500 })
  }
}

export const POST: RequestHandler = async ({ request, params }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)
  if (!allowed(params.collection)) return json({ error: 'Unknown collection' }, { status: 404 })

  try {
    const body = await request.json()
    const { id, ...data } = body ?? {}
    const db = getFirestore()
    if (id) {
      await db.collection(params.collection).doc(String(id)).set(data)
      clearLearningCache()
      return json({ id, ...data }, { status: 201 })
    }
    const ref = await db.collection(params.collection).add(data)
    // Bot-side config caches are TTL'd; drop them so edits show up at once.
    clearLearningCache()
    return json({ id: ref.id, ...data }, { status: 201 })
  } catch (error) {
    console.error('Generic data POST failed:', error)
    return json({ error: 'Failed to save' }, { status: 500 })
  }
}
