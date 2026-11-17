import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore, getStorage } from '#lib/firebase-admin'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

export const POST: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const db = getFirestore()
    const bucket = getStorage().bucket()

    const usersSnapshot = await db.collection('users').get()
    const results: Array<{ phone: string; fileName: string; docId?: string; status: string }> = []

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data()
      const phone = userData.phone

      const [files] = await bucket.getFiles({
        prefix: `users/${phone}/documents/`,
      })

      for (const file of files) {
        const fileName = file.name.split('/').pop() || ''
        if (!fileName) continue

        const match = fileName.match(/^(\d+)_(.+)$/)
        const timestamp = match ? parseInt(match[1]) : Date.now()
        const originalName = match ? match[2] : fileName

        const existingDocs = await db
          .collection('documents')
          .where('phone', '==', phone)
          .where('filePath', '==', file.name)
          .get()

        if (existingDocs.empty) {
          const docRef = await db.collection('documents').add({
            phone,
            title: originalName,
            filePath: file.name,
            uploadedAt: new Date(timestamp).toISOString(),
          })
          results.push({ phone, fileName: originalName, docId: docRef.id, status: 'created' })
        } else {
          results.push({ phone, fileName: originalName, status: 'already_exists' })
        }
      }
    }

    return json({
      success: true,
      migrated: results.filter((r) => r.status === 'created').length,
      skipped: results.filter((r) => r.status === 'already_exists').length,
      details: results,
    })
  } catch (error) {
    console.error('Migration error:', error)
    return json(
      { error: 'Migration failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
