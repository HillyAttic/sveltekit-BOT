import { error, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

// Stable links already sent over WhatsApp point here; send them to the player
// page instead of the raw file (which offers Download) or a Firebase URL.
export const GET: RequestHandler = async ({ params }) => {
  if (!params.path?.startsWith('learning-videos/')) throw error(404, 'Not found')
  const path = params.path.split('/').map(encodeURIComponent).join('/')
  return redirect(302, `/watch/${path}`)
}
