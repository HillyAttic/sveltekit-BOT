import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

export const GET: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  const results: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    tests: {
      envVars: {
        FIREBASE_SERVICE_ACCOUNT_JSON: !!process.env.FIREBASE_SERVICE_ACCOUNT_JSON,
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      },
    },
  }

  try {
    const { getFirestore } = await import('#lib/firebase-admin')
    const db = getFirestore()
    ;(results.tests as Record<string, unknown>).firebaseInit = 'SUCCESS'

    try {
      const usersSnapshot = await db.collection('users').limit(5).get()
      ;(results.tests as Record<string, unknown>).firestoreRead = {
        status: 'SUCCESS',
        userCount: usersSnapshot.size,
        users: usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      }
    } catch (readError) {
      ;(results.tests as Record<string, unknown>).firestoreRead = {
        status: 'FAILED',
        error: readError instanceof Error ? readError.message : String(readError),
      }
    }

    try {
      const docsSnapshot = await db.collection('documents').limit(5).get()
      ;(results.tests as Record<string, unknown>).documentsRead = {
        status: 'SUCCESS',
        docCount: docsSnapshot.size,
        documents: docsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      }
    } catch (readError) {
      ;(results.tests as Record<string, unknown>).documentsRead = {
        status: 'FAILED',
        error: readError instanceof Error ? readError.message : String(readError),
      }
    }
  } catch (initError) {
    ;(results.tests as Record<string, unknown>).firebaseInit = {
      status: 'FAILED',
      error: initError instanceof Error ? initError.message : String(initError),
    }
  }

  return json(results)
}
