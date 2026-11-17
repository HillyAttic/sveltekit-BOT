import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { verifyToken } from '#lib/simple-auth'

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { token } = await request.json()

    if (!token) {
      return json({ error: 'Token is required' }, { status: 400 })
    }

    const user = verifyToken(token)

    if (!user) {
      return json({ error: 'Invalid token' }, { status: 401 })
    }

    return json({ user })
  } catch (error) {
    console.error('Verify error:', error)
    return json({ error: 'Verification failed' }, { status: 500 })
  }
}
