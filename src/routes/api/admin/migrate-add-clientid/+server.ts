import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'
import { migrateAddClientId } from '#lib/migrate-add-clientid'

export const POST: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    return json(await migrateAddClientId())
  } catch (error) {
    console.error('Migration error:', error)
    return json(
      {
        error: 'Migration failed',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
