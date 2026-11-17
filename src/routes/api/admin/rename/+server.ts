import { json } from '@sveltejs/kit'
import type { Query } from 'firebase-admin/firestore'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

export const POST: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const { type, category, fiscalYear, subCategory, newName } = await request.json()

    if (!type || !category || !newName) {
      return json({ error: 'Missing required fields' }, { status: 400 })
    }

    const db = getFirestore()
    const clientsSnapshot = await db.collection('users').get()
    const batch = db.batch()
    let updateCount = 0

    for (const clientDoc of clientsSnapshot.docs) {
      const documentsRef = db.collection('users').doc(clientDoc.id).collection('documents')

      let query: Query = documentsRef.where('category', '==', category)

      if (type === 'fiscalYear' && fiscalYear) {
        query = query.where('fiscalYear', '==', fiscalYear)
      } else if (type === 'subCategory' && fiscalYear && subCategory) {
        query = query
          .where('fiscalYear', '==', fiscalYear)
          .where('subCategory', '==', subCategory)
      }

      const docsSnapshot = await query.get()

      for (const doc of docsSnapshot.docs) {
        const data = doc.data()
        const updateData: Record<string, unknown> = {}

        if (type === 'category') {
          updateData.category = newName
          if (data.filePath) {
            const pathParts = data.filePath.split('/')
            const categoryIndex = pathParts.findIndex((part: string) => part === category)
            if (categoryIndex !== -1) {
              pathParts[categoryIndex] = newName
              updateData.filePath = pathParts.join('/')
            }
          }
        } else if (type === 'fiscalYear') {
          updateData.fiscalYear = newName
          if (data.filePath) {
            const pathParts = data.filePath.split('/')
            const fyIndex = pathParts.findIndex((part: string) => part === fiscalYear)
            if (fyIndex !== -1) {
              pathParts[fyIndex] = newName
              updateData.filePath = pathParts.join('/')
            }
          }
        } else if (type === 'subCategory') {
          updateData.subCategory = newName
          if (data.filePath) {
            const pathParts = data.filePath.split('/')
            const scIndex = pathParts.findIndex((part: string) => part === subCategory)
            if (scIndex !== -1) {
              pathParts[scIndex] = newName
              updateData.filePath = pathParts.join('/')
            }
          }
        }

        batch.update(doc.ref, updateData)
        updateCount++
      }
    }

    const categoriesRef = db.collection('config').doc('categories')
    const categoriesDoc = await categoriesRef.get()

    if (categoriesDoc.exists) {
      const categoriesData = categoriesDoc.data()
      const categories = categoriesData?.categories || {}

      if (type === 'category') {
        if (categories[category]) {
          categories[newName] = categories[category]
          delete categories[category]
        }
      } else if (type === 'fiscalYear' && fiscalYear) {
        if (categories[category]?.fiscalYears) {
          const fyIndex = categories[category].fiscalYears.indexOf(fiscalYear)
          if (fyIndex !== -1) categories[category].fiscalYears[fyIndex] = newName
        }
      } else if (type === 'subCategory' && subCategory) {
        if (categories[category]?.subCategories) {
          const scIndex = categories[category].subCategories.indexOf(subCategory)
          if (scIndex !== -1) categories[category].subCategories[scIndex] = newName
        }
      }

      batch.update(categoriesRef, { categories })
    }

    await batch.commit()

    return json({
      success: true,
      message: `Renamed ${type} successfully`,
      documentsUpdated: updateCount,
    })
  } catch (error) {
    console.error('Error renaming:', error)
    return json({ error: 'Failed to rename' }, { status: 500 })
  }
}
