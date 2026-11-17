import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { normalizePhone } from '#lib/phone'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

export const GET: RequestHandler = async ({ request, url }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  const phone = url.searchParams.get('phone')
  if (!phone) {
    return json({ error: 'Phone parameter required' }, { status: 400 })
  }

  const normalizedPhone = normalizePhone(phone)
  const db = getFirestore()

  try {
    const userSnapshot = await db
      .collection('users')
      .where('phones', 'array-contains', normalizedPhone)
      .limit(1)
      .get()

    const docsSnapshot = await db
      .collection('documents')
      .where('phone', '==', normalizedPhone)
      .get()

    return json({
      normalizedPhone,
      userExists: !userSnapshot.empty,
      documentCount: docsSnapshot.size,
      sampleDocument: docsSnapshot.docs[0]?.data() || null,
      allDocumentIds: docsSnapshot.docs.map((d) => d.id),
    })
  } catch (error) {
    return json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
