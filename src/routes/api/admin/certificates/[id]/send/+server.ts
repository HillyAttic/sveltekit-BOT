import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { deliverCertificate, type Certificate } from '#lib/certificate-service'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

/** Send (or resend) one certificate PDF on WhatsApp, now. */
export const POST: RequestHandler = async ({ request, params }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const db = getFirestore()
    const snap = await db.collection('certificates').doc(params.id).get()
    if (!snap.exists) return json({ error: 'Certificate not found' }, { status: 404 })

    const certificate: Certificate = { ...(snap.data() as Certificate), id: snap.id }

    // Certificates issued before delivery existed have no phone — look it up.
    let phone = certificate.phone
    if (!phone && certificate.employeeId) {
      const users = await db
        .collection('users')
        .where('employeeId', '==', certificate.employeeId)
        .limit(1)
        .get()
      const user = users.empty ? null : users.docs[0].data()
      phone = (user?.phones?.[0] ?? user?.phone ?? '') as string
    }
    if (!phone) {
      return json(
        { error: 'No WhatsApp number on file for this employee — ask them to register first' },
        { status: 400 }
      )
    }

    const sent = await deliverCertificate({ ...certificate, phone: String(phone) })
    if (!sent) return json({ error: 'WhatsApp delivery failed — check the server logs' }, { status: 502 })
    return json({ ok: true })
  } catch (error) {
    console.error('Certificate send failed:', error)
    return json({ error: 'Failed to send certificate' }, { status: 500 })
  }
}
