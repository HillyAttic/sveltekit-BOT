import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

/**
 * Admin-only diagnostics. Values are never returned — only presence/shape.
 */
export const GET: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  const diagnostics: Record<string, unknown> = {}

  const envVars = [
    'WHATSAPP_TOKEN',
    'PHONE_NUMBER_ID',
    'WEBHOOK_VERIFY_TOKEN',
    'APP_SECRET',
    'FIREBASE_SERVICE_ACCOUNT_JSON',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  ]

  diagnostics.envCheck = {}
  for (const key of envVars) {
    const value = process.env[key]
    ;(diagnostics.envCheck as Record<string, string>)[key] = value
      ? `SET (${value.length} chars)`
      : 'MISSING'
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  if (serviceAccountJson) {
    try {
      const parsed = JSON.parse(serviceAccountJson)
      diagnostics.serviceAccountParsing = 'SUCCESS'
      diagnostics.serviceAccountKeys = Object.keys(parsed)
      diagnostics.projectId = parsed.project_id || 'MISSING'
      diagnostics.clientEmail = parsed.client_email ? 'SET' : 'MISSING'
      diagnostics.privateKeyPresent = parsed.private_key ? 'SET' : 'MISSING'
    } catch (error) {
      diagnostics.serviceAccountParsing = 'FAILED'
      diagnostics.parseError = error instanceof Error ? error.message : String(error)
    }
  }

  try {
    const { getFirestore } = await import('#lib/firebase-admin')
    const db = getFirestore()
    diagnostics.firestoreInit = 'SUCCESS'

    try {
      const snapshot = await db.collection('users').limit(1).get()
      diagnostics.firestoreRead = 'SUCCESS'
      diagnostics.sampleDocCount = snapshot.size
    } catch (readError) {
      diagnostics.firestoreRead = 'FAILED'
      diagnostics.readError =
        readError instanceof Error ? readError.message : String(readError)
    }
  } catch (initError) {
    diagnostics.firestoreInit = 'FAILED'
    diagnostics.initError = initError instanceof Error ? initError.message : String(initError)
  }

  return json(diagnostics)
}
