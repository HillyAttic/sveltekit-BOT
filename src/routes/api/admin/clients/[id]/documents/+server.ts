import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'
import { getCategories } from '#lib/document-service'

export const GET: RequestHandler = async ({ request, params }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const db = getFirestore()
    const clientDoc = await db.collection('users').doc(params.id).get()

    if (!clientDoc.exists) {
      return json({ error: 'Client not found' }, { status: 404 })
    }

    const snapshot = await db
      .collection('documents')
      .where('clientId', '==', params.id)
      .orderBy('uploadedAt', 'desc')
      .get()

    return json(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  } catch (error) {
    console.error('Error fetching documents:', error)
    return json({ error: 'Failed to fetch documents' }, { status: 500 })
  }
}

export const POST: RequestHandler = async ({ request, params }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const db = getFirestore()
    const clientDoc = await db.collection('users').doc(params.id).get()

    if (!clientDoc.exists) {
      return json({ error: 'Client not found' }, { status: 404 })
    }

    const phones = clientDoc.data()?.phones
    if (!phones || !Array.isArray(phones) || phones.length === 0) {
      return json({ error: 'Client has no phone numbers associated' }, { status: 400 })
    }

    const phone = phones[0]
    const { title, filePath, category, fiscalYear, subCategory } = await request.json()

    if (!title || !filePath) {
      return json({ error: 'Title and filePath are required' }, { status: 400 })
    }

    const categories = await getCategories()
    if (!category || !categories[category]) {
      return json({ error: 'Valid category is required' }, { status: 400 })
    }

    const catConfig = categories[category]
    if (catConfig.fiscalYears.length > 0 && !fiscalYear) {
      return json({ error: 'Fiscal year is required for this category' }, { status: 400 })
    }
    if (catConfig.subCategories.length > 0 && !subCategory) {
      return json({ error: 'Sub-category is required for this category' }, { status: 400 })
    }

    const uploadedAt = new Date().toISOString()
    const payload = {
      clientId: params.id,
      phone,
      title,
      filePath,
      category,
      fiscalYear: fiscalYear ?? null,
      subCategory: subCategory ?? null,
      uploadedAt,
    }

    const docRef = await db.collection('documents').add(payload)

    return json({ id: docRef.id, ...payload }, { status: 201 })
  } catch (error) {
    console.error('Error creating document:', error)
    return json({ error: 'Failed to create document' }, { status: 500 })
  }
}
