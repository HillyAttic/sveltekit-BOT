import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'
import { processDueReminders } from '#lib/reminder-service'

export const POST: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)
  try {
    const result = await processDueReminders()
    return json(result)
  } catch (e) {
    return json({ error: 'Failed' }, { status: 500 })
  }
}
