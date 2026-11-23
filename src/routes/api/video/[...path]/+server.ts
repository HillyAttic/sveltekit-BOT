import { error, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { generateSignedUrl } from '#lib/storage-service'

// Stable public link stored on learning modules: each visit mints a fresh
// signed read URL, so links sent over WhatsApp keep working past the 1h expiry.
export const GET: RequestHandler = async ({ params }) => {
  if (!params.path?.startsWith('learning-videos/')) throw error(404, 'Not found')
  return redirect(302, await generateSignedUrl(params.path))
}
