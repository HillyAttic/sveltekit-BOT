import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

export const GET: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const db = getFirestore()
    const doc = await db.collection('config').doc('categories').get()

    if (!doc.exists) {
      return json({ categories: {} })
    }

    return json({ categories: doc.data()?.categories || {} })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export const POST: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const { categories } = await request.json()

    const db = getFirestore()
    await db.collection('config').doc('categories').set({
      categories,
      updatedAt: new Date().toISOString(),
    })

    return json({ success: true })
  } catch (error) {
    console.error('Error saving categories:', error)
    return json({ error: 'Failed to save categories' }, { status: 500 })
  }
}
