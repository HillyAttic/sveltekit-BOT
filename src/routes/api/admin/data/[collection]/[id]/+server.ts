import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

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

export const PUT: RequestHandler = async ({ request, params }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)
  if (!allowed(params.collection)) return json({ error: 'Unknown collection' }, { status: 404 })

  try {
    const data = await request.json()
    const db = getFirestore()
    await db.collection(params.collection).doc(params.id).update(data ?? {})
    return json({ id: params.id, ...data })
  } catch (error) {
    console.error('Generic data PUT failed:', error)
    return json({ error: 'Failed to update' }, { status: 500 })
  }
}

export const DELETE: RequestHandler = async ({ request, params }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)
  if (!allowed(params.collection)) return json({ error: 'Unknown collection' }, { status: 404 })

  try {
    const db = getFirestore()
    await db.collection(params.collection).doc(params.id).delete()
    return json({ success: true })
  } catch (error) {
    console.error('Generic data DELETE failed:', error)
    return json({ error: 'Failed to delete' }, { status: 500 })
  }
}
