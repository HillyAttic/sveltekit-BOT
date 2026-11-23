import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { generateDownloadUrl } from '#lib/storage-service'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

// Turns a learning-videos/ storage path into a permanent Firebase download link.
export const POST: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const { filePath } = await request.json()
    if (typeof filePath !== 'string' || !filePath.startsWith('learning-videos/')) {
      return json({ error: 'A learning-videos/ filePath is required' }, { status: 400 })
    }
    return json({ url: await generateDownloadUrl(filePath) })
  } catch (error) {
    console.error('Error generating download URL:', error)
    return json({ error: 'Failed to generate download URL' }, { status: 500 })
  }
}
