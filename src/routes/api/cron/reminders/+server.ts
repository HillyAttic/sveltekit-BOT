import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { processDueReminders } from '#lib/reminder-service'

/**
 * Background scheduler hook. Point any cron service (Vercel Cron, GitHub
 * Actions, Cloudflare) at GET /api/cron/reminders?secret=... every minute.
 * Set CRON_SECRET in the environment; requests without it are rejected.
 */
export const GET: RequestHandler = async ({ request, url }) => {
  const secret = process.env.CRON_SECRET
  if (secret) {
    const provided = url.searchParams.get('secret') || request.headers.get('authorization')
    if (provided !== secret && provided !== `Bearer ${secret}`) {
      return json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    const result = await processDueReminders()
    return json(result)
  } catch (error) {
    console.error('Cron reminder processing failed:', error)
    return json({ error: 'Failed' }, { status: 500 })
  }
}
