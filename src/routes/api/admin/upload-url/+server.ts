import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getStorage } from '#lib/firebase-admin'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

export const POST: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const { filePath, contentType } = await request.json()

    if (!filePath) {
      return json({ error: 'filePath is required' }, { status: 400 })
    }

    const bucket = getStorage().bucket()
    const file = bucket.file(filePath)

    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 60 * 60 * 1000,
      contentType: contentType || 'application/octet-stream',
    })

    return json({ url, filePath })
  } catch (error) {
    console.error('Error generating upload URL:', error)
    return json({ error: 'Failed to generate upload URL' }, { status: 500 })
  }
}
