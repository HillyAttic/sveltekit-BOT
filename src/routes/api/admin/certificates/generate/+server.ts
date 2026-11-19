import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { generateMissingCertificates } from '#lib/certificate-service'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

/** Issue certificates for every employee who has finished all modules and passed every quiz. */
export const POST: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const result = await generateMissingCertificates()
    return json(result)
  } catch (error) {
    console.error('Certificate generation failed:', error)
    return json({ error: 'Failed to generate certificates' }, { status: 500 })
  }
}
