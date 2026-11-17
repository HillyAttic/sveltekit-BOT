import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { uploadFile } from '#lib/storage-service'
import { normalizePhone } from '#lib/phone'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'
import { getClientFolderPaths } from '#lib/document-categories'

export const GET: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const db = getFirestore()
    const snapshot = await db.collection('users').get()
    const clients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return json(clients)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return json({ error: 'Failed to fetch clients' }, { status: 500 })
  }
}

export const POST: RequestHandler = async ({ request }) => {
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
        .limit(1)
        .get()
      if (!gstSnapshot.empty) {
        return json({ error: 'GST number already exists for another client' }, { status: 400 })
      }
    }

    const normalizedPhones = phones.map((p: string) => normalizePhone(p))

    const docData: Record<string, unknown> = {
      name,
      phones: normalizedPhones,
      createdAt: new Date().toISOString(),
    }
    if (gstNumber) docData.gstNumber = gstNumber

    const docRef = await db.collection('users').add(docData)

    // Scaffold the JPCO folder structure in Firebase Storage
    const placeholder = Buffer.from('')
    await Promise.all(
      getClientFolderPaths(name).map((p) =>
        uploadFile(placeholder, p, 'application/octet-stream')
      )
    )

    return json({ id: docRef.id, name, phones: normalizedPhones, gstNumber }, { status: 201 })
  } catch (error) {
    console.error('Error creating client:', error)
    return json({ error: 'Failed to create client' }, { status: 500 })
  }
}
