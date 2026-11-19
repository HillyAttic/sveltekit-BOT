import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { normalizePhone } from '#lib/phone'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

/**
 * One employee's learning report: every video delivered to their phone and
 * every assessment scorecard filed under their employee ID.
 */
export const GET: RequestHandler = async ({ request, url }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  const raw = url.searchParams.get('phone')
  if (!raw) return json({ error: 'phone is required' }, { status: 400 })
  const phone = normalizePhone(raw)

  try {
    const db = getFirestore()

    // Employee ID lives on the user doc (registration); scorecards are keyed by it.
    const userSnap = await db
      .collection('users')
      .where('phones', 'array-contains', phone)
      .limit(1)
      .get()
    const legacySnap = userSnap.empty
      ? await db.collection('users').where('phone', '==', phone).limit(1).get()
      : null
    const userDoc = userSnap.empty ? legacySnap?.docs[0] : userSnap.docs[0]
    const user = userDoc?.data() ?? {}
    const employeeId = (user.employeeId as string) || ''

    const [deliveriesSnap, scorecardsSnap] = await Promise.all([
      db.collection('videoDeliveries').where('phone', '==', phone).get(),
      employeeId
        ? db.collection('scorecards').where('employeeId', '==', employeeId).get()
        : Promise.resolve(null),
    ])

    const videos = deliveriesSnap.docs
      .map((d) => {
        const data = d.data()
        return {
          id: d.id,
          moduleNumber: (data.moduleNumber as string) || '',
          videoTitle: (data.videoTitle as string) || '',
          deliveredAt: (data.deliveredAt as string) || '',
          completedAt: (data.completedAt as string) || '',
          status: (data.status as string) || 'pending',
        }
      })
      .sort((a, b) => b.deliveredAt.localeCompare(a.deliveredAt))

    const assessments = (scorecardsSnap?.docs ?? [])
      .map((d) => {
        const data = d.data()
        return {
          id: d.id,
          assessmentTitle: (data.assessmentTitle as string) || '',
          videoTitle: (data.videoTitle as string) || '',
          moduleNumber: (data.moduleNumber as string) || '',
          marksObtained: Number(data.marksObtained ?? data.score ?? 0),
          totalMarks: Number(data.totalMarks ?? data.total ?? 0),
          percentage: Number(data.percentage ?? 0),
          result: (data.result as string) || '',
          status: (data.status as string) || '',
          timeTakenSeconds: Number(data.timeTakenSeconds ?? 0),
          completedAt: (data.completionDate as string) || (data.createdAt as string) || '',
        }
      })
      .sort((a, b) => a.completedAt.localeCompare(b.completedAt))

    return json({ employeeId, videos, assessments })
  } catch (error) {
    console.error('Error building employee report:', error)
    return json({ error: 'Failed to build employee report' }, { status: 500 })
  }
}
