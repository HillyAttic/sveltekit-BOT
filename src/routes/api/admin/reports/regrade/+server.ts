import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getFirestore } from '#lib/firebase-admin'
import { evaluateQuestions, type Assessment, type Question } from '#lib/learning-service'
import { verifyAdminToken, unauthorizedResponse } from '#lib/auth-middleware'

/**
 * Re-grade submissions left PENDING because their questions had no answer key.
 * Uses the submitted answers already stored, so nothing is re-asked of the user.
 * Submissions whose questions are still unkeyed stay PENDING.
 */
export const POST: RequestHandler = async ({ request }) => {
  const auth = await verifyAdminToken(request)
  if (!auth.authorized) return unauthorizedResponse(auth.error)

  try {
    const db = getFirestore()
    const [subsSnap, questionsSnap, assessmentsSnap] = await Promise.all([
      db.collection('assessmentSubmissions').where('result', '==', 'PENDING').get(),
      db.collection('questions').get(),
      db.collection('assessments').get(),
    ])

    const questions = new Map<string, Question>(
      questionsSnap.docs.map((d) => [d.id, { ...(d.data() as Omit<Question, 'id'>), id: d.id }])
    )
    const assessments = new Map<string, Assessment>(
      assessmentsSnap.docs.map((d) => [d.id, { ...(d.data() as Omit<Assessment, 'id'>), id: d.id }])
    )

    let regraded = 0
    let stillPending = 0

    for (const sub of subsSnap.docs) {
      const data = sub.data()
      const assessment = assessments.get(data.assessmentId as string)
      const paper = (assessment?.questionIds ?? [])
        .map((id) => questions.get(id))
        .filter((q): q is Question => !!q)

      if (paper.length === 0) { stillPending++; continue }

      const evaluation = evaluateQuestions(
        paper,
        (data.answers as Record<string, string>) ?? {},
        assessment?.passingPercentage ?? 40
      )
      if (evaluation.result === 'PENDING') { stillPending++; continue }

      const status = evaluation.result
      const scores = {
        correctAnswers: evaluation.correct,
        incorrectAnswers: evaluation.incorrect,
        unanswered: evaluation.unanswered,
        totalMarks: evaluation.totalMarks,
        marksObtained: evaluation.marksObtained,
        percentage: evaluation.percentage,
        result: evaluation.result,
        status,
      }

      await sub.ref.update(scores)
      const cards = await db.collection('scorecards').where('submissionId', '==', sub.id).get()
      for (const card of cards.docs) {
        await card.ref.update({ ...scores, score: evaluation.marksObtained, total: evaluation.totalMarks })
      }
      regraded++
    }

    return json({ regraded, stillPending })
  } catch (error) {
    console.error('Re-grade failed:', error)
    return json({ error: 'Failed to re-grade' }, { status: 500 })
  }
}
