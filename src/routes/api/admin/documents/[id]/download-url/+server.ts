import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { generateSignedUrl } from '#lib/storage-service'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

export const GET: RequestHandler = async ({ request, params }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const db = getFirestore()
    const docRef = await db.collection('documents').doc(params.id).get()

    if (!docRef.exists) {
      return json({ error: 'Document not found' }, { status: 404 })
    }

    const filePath = docRef.data()?.filePath

    if (!filePath) {
      return json({ error: 'File path not found' }, { status: 404 })
    }

    return json({ url: await generateSignedUrl(filePath) })
  } catch (error) {
    console.error('Error generating download URL:', error)
    return json({ error: 'Failed to generate download URL' }, { status: 500 })
  }
}
