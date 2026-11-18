import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'
import { recordVideoDelivery, markDeliveryComplete, cancelReminders } from '#lib/reminder-service'
import { sendMessage } from '#lib/message-sender'
import { normalizePhone } from '#lib/phone'

export const GET: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)
  try {
    const db = getFirestore()
    const snap = await db.collection('videoDeliveries').orderBy('deliveredAt', 'desc').limit(200).get()
    return json(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  } catch (e) {
    return json({ error: 'Failed' }, { status: 500 })
  }
}

export const POST: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)
  try {
    const body = await request.json()
    if (!body.phone || !body.videoTitle) {
      return json({ error: 'phone and videoTitle are required' }, { status: 400 })
    }

    const id = await recordVideoDelivery({ ...body, deliveredAt: body.deliveredAt || new Date().toISOString() })

    // Deliver the video link to the employee. Delivery is recorded even when
    // WhatsApp is not configured locally; the reminder clock has already started.
    let deliveryMessage = `Hi ${body.employeeName || 'there'}! Here is your learning video: ${body.videoTitle}.`
    if (body.videoUrl) deliveryMessage += `\n\nWatch here: ${body.videoUrl}`
    deliveryMessage += '\n\nType FINISH once you have completed the video.'
    let sent = false
    try {
      await sendMessage(normalizePhone(body.phone), deliveryMessage)
      sent = true
    } catch (e) {
      console.error('Video delivery message failed:', e)
    }

    return json({ id, sent }, { status: 201 })
  } catch (e) {
    console.error('Video delivery failed:', e)
    return json({ error: 'Failed to deliver video' }, { status: 500 })
  }
}

export const DELETE: RequestHandler = async ({ request, url }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)
  const id = url.searchParams.get('id')
  if (!id) return json({ error: 'id required' }, { status: 400 })
  await markDeliveryComplete(id)
  await cancelReminders(id)
  return json({ success: true })
}
