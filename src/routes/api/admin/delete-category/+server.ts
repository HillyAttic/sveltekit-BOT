import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

export const POST: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const { type, category, fiscalYear, subCategory } = await request.json()

    if (!type || !category) {
      return json({ error: 'Missing required fields' }, { status: 400 })
    }

    const db = getFirestore()
    const categoriesRef = db.collection('config').doc('categories')
    const categoriesDoc = await categoriesRef.get()

    if (!categoriesDoc.exists) {
      return json({ error: 'Categories configuration not found' }, { status: 404 })
    }

    const categories = categoriesDoc.data()?.categories || {}

    if (type === 'category') {
      if (categories[category]) delete categories[category]
    } else if (type === 'fiscalYear' && fiscalYear) {
      if (categories[category]?.fiscalYears) {
        categories[category].fiscalYears = categories[category].fiscalYears.filter(
          (fy: string) => fy !== fiscalYear
        )
      }
    } else if (type === 'subCategory' && subCategory) {
      if (categories[category]?.subCategories) {
        categories[category].subCategories = categories[category].subCategories.filter(
          (sc: string) => sc !== subCategory
        )
      }
    }

    await categoriesRef.update({ categories })

    return json({ success: true, message: `Deleted ${type} successfully` })
  } catch (error) {
    console.error('Error deleting:', error)
    return json({ error: 'Failed to delete' }, { status: 500 })
  }
}
