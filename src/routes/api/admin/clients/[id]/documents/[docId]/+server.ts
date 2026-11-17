import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { deleteFile } from '#lib/storage-service'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'
import { CATEGORIES } from '#lib/document-categories'

export const PUT: RequestHandler = async ({ request, params }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const db = getFirestore()
    const docRef = db.collection('documents').doc(params.docId)
    const docSnap = await docRef.get()

    if (!docSnap.exists) {
      return json({ error: 'Document not found' }, { status: 404 })
    }

    const document = docSnap.data()
    const phone = document?.phone

    const body = await request.json()
    const title = body.title as string
    const newFilePath = body.filePath as string | undefined
    const category =
      body.category !== undefined ? body.category || null : (document?.category ?? null)
    const fiscalYear =
      body.fiscalYear !== undefined ? body.fiscalYear || null : (document?.fiscalYear ?? null)
    const subCategory =
      body.subCategory !== undefined ? body.subCategory || null : (document?.subCategory ?? null)

    if (!title) {
      return json({ error: 'Title is required' }, { status: 400 })
    }

    let validCategories = CATEGORIES
    try {
      const categoriesDoc = await db.collection('config').doc('categories').get()
      if (categoriesDoc.exists && categoriesDoc.data()?.categories) {
        validCategories = categoriesDoc.data()!.categories
      }
    } catch (error) {
      console.warn('Could not load categories from database, using defaults:', error)
    }

    if (category && !validCategories[category]) {
      return json(
        {
          error: `Invalid category: ${category}. Valid categories are: ${Object.keys(validCategories).join(', ')}`,
        },
        { status: 400 }
      )
    }

    let filePath = document?.filePath

    if (newFilePath && newFilePath !== filePath) {
      if (document?.filePath) {
        try {
          await deleteFile(document.filePath)
        } catch (error) {
          console.error('Error deleting old file:', error)
        }
      }
      filePath = newFilePath
    }

    await docRef.update({
      title,
      filePath,
      category: category ?? null,
      fiscalYear: fiscalYear ?? null,
      subCategory: subCategory ?? null,
    })

    return json({
      id: params.docId,
      phone,
      title,
      filePath,
      category: category ?? null,
      fiscalYear: fiscalYear ?? null,
      subCategory: subCategory ?? null,
      uploadedAt: document?.uploadedAt,
    })
  } catch (error) {
    console.error('Error updating document:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to update document'
    return json({ error: 'Failed to update document', details: errorMessage }, { status: 500 })
  }
}

export const DELETE: RequestHandler = async ({ request, params }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const db = getFirestore()
    const docRef = db.collection('documents').doc(params.docId)
    const docSnap = await docRef.get()

    if (!docSnap.exists) {
      return json({ error: 'Document not found' }, { status: 404 })
    }

    const document = docSnap.data()

    if (document?.filePath) {
      try {
        await deleteFile(document.filePath)
      } catch (error) {
        console.error('Error deleting file:', error)
        return json({ error: 'Failed to delete file from storage' }, { status: 500 })
      }
    }

    await docRef.delete()
    return json({ success: true })
  } catch (error) {
    console.error('Error deleting document:', error)
    return json({ error: 'Failed to delete document' }, { status: 500 })
  }
}
