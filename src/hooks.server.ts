import { redirect } from '@sveltejs/kit'
import type { Handle } from '@sveltejs/kit/hooks'
import { verifyTokenEdge } from '#lib/simple-auth-edge'

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/admin')) {
    const token = event.cookies.get('auth_token')
    const user = token ? await verifyTokenEdge(token) : null

    if (!user?.isAdmin) {
      throw redirect(303, '/')
    }
  }

  return resolve(event)
}
