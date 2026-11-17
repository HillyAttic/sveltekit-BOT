import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { deleteFile } from '#lib/storage-service'
import { normalizePhone } from '#lib/phone'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

export const PUT: RequestHandler = async ({ request, params }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const db = getFirestore()
    const { name, phones, gstNumber } = await request.json()

    if (!name || !phones || !Array.isArray(phones) || phones.length === 0) {
      return json({ error: 'Name and at least one phone number are required' }, { status: 400 })
    }

    if (gstNumber) {
      const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
      if (gstNumber.length !== 15 || !gstPattern.test(gstNumber)) {
        return json({ error: 'Invalid GST number format' }, { status: 400 })
      }

      const gstSnapshot = await db
        .collection('users')
        .where('gstNumber', '==', gstNumber)
        .limit(2)
        .get()
      const otherClientsWithGst = gstSnapshot.docs.filter((doc) => doc.id !== params.id)
      if (otherClientsWithGst.length > 0) {
        return json({ error: 'GST number already exists for another client' }, { status: 400 })
      }
    }

    const normalizedPhones = phones.map((p: string) => normalizePhone(p))
    const updateData: Record<string, unknown> = { name, phones: normalizedPhones }
    if (gstNumber) updateData.gstNumber = gstNumber

    await db.collection('users').doc(params.id).update(updateData)

    return json({ id: params.id, name, phones: normalizedPhones, gstNumber })
  } catch (error) {
    console.error('Error updating client:', error)
    return json({ error: 'Failed to update client' }, { status: 500 })
  }
}

export const DELETE: RequestHandler = async ({ request, params }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const db = getFirestore()
    const clientDoc = await db.collection('users').doc(params.id).get()

    if (!clientDoc.exists) {
      return json({ error: 'Client not found' }, { status: 404 })
    }

    const docsSnapshot = await db
      .collection('documents')
      .where('clientId', '==', params.id)
      .get()

    // Best-effort file deletes; Firestore batch below stays atomic.
    for (const doc of docsSnapshot.docs) {
      const data = doc.data()
      if (data.filePath) {
        try {
          await deleteFile(data.filePath)
        } catch (error) {
          console.error(`Error deleting file ${data.filePath}:`, error)
        }
      }
    }

    const batch = db.batch()
    for (const doc of docsSnapshot.docs) batch.delete(doc.ref)
    batch.delete(db.collection('users').doc(params.id))
    await batch.commit()

    return json({ success: true })
  } catch (error) {
    console.error('Error deleting client:', error)
    return json({ error: 'Failed to delete client' }, { status: 500 })
  }
}
