import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'
import { getReminderConfig, saveReminderConfig, getReminderHistory } from '#lib/reminder-service'

export const GET: RequestHandler = async ({ request, url }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)
  try {
    const db = getFirestore()
    const config = await getReminderConfig()
    if (url.searchParams.get('history') === '1') {
      const history = await getReminderHistory()
      return json({ config, history })
    }
    const deliveries = await db.collection('videoDeliveries').orderBy('deliveredAt', 'desc').limit(100).get()
    const rows = deliveries.docs.map(d => ({ id: d.id, ...d.data() }))
    return json({ config, deliveries: rows })
  } catch (e) {
    return json({ error: 'Failed' }, { status: 500 })
  }
}

export const POST: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)
  try {
    const body = await request.json()
    if (body.config) await saveReminderConfig(body.config)
    return json({ success: true })
  } catch (e) {
    return json({ error: 'Failed' }, { status: 500 })
  }
}
