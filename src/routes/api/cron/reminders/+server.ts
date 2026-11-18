import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { processDueReminders } from '#lib/reminder-service'
import { verifyAdminToken } from '#lib/auth-middleware'

/**
 * Background scheduler hook. Point any cron service (Vercel Cron, GitHub
 * Actions, Cloudflare) at GET /api/cron/reminders?secret=... every minute.
 * Set CRON_SECRET in the environment; requests without it are rejected.
 */
export const GET: RequestHandler = async ({ request, url }) => {
  const secret = process.env.CRON_SECRET
  const provided = url.searchParams.get('secret') || request.headers.get('authorization')
  const secretOk = secret ? provided === secret || provided === `Bearer ${secret}` : false
  if (!secretOk) {
    // No (or wrong) cron secret: fall back to an admin token.
    const auth = await verifyAdminToken(request)
    if (!auth.authorized) return json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await processDueReminders()
    return json(result)
  } catch (error) {
    console.error('Cron reminder processing failed:', error)
    return json({ error: 'Failed' }, { status: 500 })
  }
}
