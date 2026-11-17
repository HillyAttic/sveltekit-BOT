import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { validateCredentials, generateToken } from '#lib/simple-auth'

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return json({ error: 'Email and password are required' }, { status: 400 })
    }

    const user = validateCredentials(email, password)

    if (!user) {
      return json({ error: 'Invalid email or password' }, { status: 401 })
    }

    return json({ user, token: generateToken(user) })
  } catch (error) {
    console.error('Login error:', error)
    return json({ error: 'Login failed' }, { status: 500 })
  }
}
