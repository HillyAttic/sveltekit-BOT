import { getFirestore } from './firebase-admin'
import { normalizePhone } from './phone'

/* ------------------------------ registration ----------------------------- */

export const DEFAULT_EMPLOYEE_ID_PATTERN = '^[A-Za-z0-9._-]{3,30}$'

export async function getRegistrationConfig(): Promise<{
  employeeIdPattern: string
  consentVersion: string
}> {
  try {
    const doc = await getFirestore().collection('config').doc('registration').get()
    const data = doc.exists ? doc.data() : {}
    return {
      employeeIdPattern:
        typeof data.employeeIdPattern === 'string' && data.employeeIdPattern
          ? data.employeeIdPattern
          : DEFAULT_EMPLOYEE_ID_PATTERN,
      consentVersion: typeof data.consentVersion === 'string' ? data.consentVersion : 'v1',
    }
  } catch (error) {
    console.error('[learning] registration config read failed, using defaults:', error)
    return { employeeIdPattern: DEFAULT_EMPLOYEE_ID_PATTERN, consentVersion: 'v1' }
  }
}

/* --------------------------------- cities -------------------------------- */

export interface CityZone {
  id: string
  name: string
  zone: string
}

/** Cities configured in the admin City & Zone page, with their zone mapping. */
export async function getCities(): Promise<CityZone[]> {
  const snap = await getFirestore().collection('cities').get()
  return snap.docs
    .map((d) => {
      const data = d.data()
      return { id: d.id, name: String(data.name ?? '').trim(), zone: String(data.zone ?? '').trim() }
    })
    .filter((c) => c.name)
}

/* -------------------------- modules and assessments ---------------------- */

export interface LearningModule {
  id: string
  title: string
  videoUrl: string
  description?: string
  moduleNumber?: string
  order?: number
  active?: boolean
  status?: string
}

export interface Assessment {
  id: string
  title: string
  questionIds?: string[]
  moduleNumber?: string
  passingPercentage?: number
}

export interface Question {
  id: string
  text: string
  type?: string
  options?: string[]
  correctAnswer?: string | number
  keywords?: string[]
  marks?: number
}

export function moduleKey(module: Pick<LearningModule, 'moduleNumber' | 'title'>): string {
  return String(module.moduleNumber ?? module.title)
}

export async function getActiveModules(): Promise<LearningModule[]> {
  const snap = await getFirestore().collection('learningModules').get()
  return snap.docs
    .map((d) => ({ ...(d.data() as Omit<LearningModule, 'id'>), id: d.id }))
    .filter((m) => m.title && m.active !== false && m.status !== 'inactive')
    .sort((a, b) => {
      const av = parseInt(String(a.moduleNumber ?? ''), 10)
      const bv = parseInt(String(b.moduleNumber ?? ''), 10)
      const an = Number.isFinite(av) ? av : (a.order ?? Number.MAX_SAFE_INTEGER)
      const bn = Number.isFinite(bv) ? bv : (b.order ?? Number.MAX_SAFE_INTEGER)
      return an - bn
    })
}

async function getCompletedModuleKeys(phone: string): Promise<Set<string>> {
  const snap = await getFirestore()
    .collection('videoDeliveries')
    .where('phone', '==', normalizePhone(phone))
    .get()
  return new Set(
    snap.docs
      .filter((d) => d.data().status === 'completed')
      .map((d) => String(d.data().moduleNumber ?? d.data().videoTitle))
  )
}

/** First active module whose video the employee has not completed. */
export async function getNextModule(phone: string): Promise<LearningModule | null> {
  const [modules, completed] = await Promise.all([getActiveModules(), getCompletedModuleKeys(phone)])
  return modules.find((m) => !completed.has(moduleKey(m))) ?? null
}

/**
 * Assessment linked to a module. Uses the module's `moduleNumber` when the
 * admin set one, otherwise falls back to the module's position in the sequence.
 */
export async function getAssessmentForModule(
  module: LearningModule | null,
  moduleIndex: number
): Promise<Assessment | null> {
  const snap = await getFirestore().collection('assessments').get()
  const assessments = snap.docs.map((d) => ({ ...(d.data() as Omit<Assessment, 'id'>), id: d.id }))
  if (module?.moduleNumber) {
    const byNumber = assessments.find(
      (a) => String(a.moduleNumber ?? '') === String(module.moduleNumber)
    )
    if (byNumber) return byNumber
  }
  return assessments[moduleIndex] ?? null
}

export async function getQuestionsByIds(ids: string[]): Promise<Question[]> {
  if (ids.length === 0) return []
  const snap = await getFirestore().collection('questions').get()
  const byId = new Map(
    snap.docs.map((d) => [d.id, { ...(d.data() as Omit<Question, 'id'>), id: d.id }])
  )
  return ids.map((id) => byId.get(id)).filter((q): q is Question => !!q)
}

/* ------------------------------- evaluation ------------------------------ */

export function questionOptions(question: Question): string[] {
  if (Array.isArray(question.options) && question.options.length > 0) {
    return question.options.map(String)
  }
  if (question.type === 'truefalse' || question.type === 'true_false') return ['True', 'False']
  return []
}

export interface Evaluation {
  totalQuestions: number
  totalMarks: number
  marksObtained: number
  correct: number
  incorrect: number
  unanswered: number
  percentage: number
  result: 'PASS' | 'FAIL' | 'PENDING'
  pendingManual: boolean
}

/**
 * Grades answers against the configured answer keys. Questions without a key
 * (descriptive / manually scored) put the whole assessment in PENDING.
 */
export function evaluateQuestions(
  questions: Question[],
  answers: Record<string, string>,
  passingPercentage = 40
): Evaluation {
  let totalMarks = 0
  let marksObtained = 0
  let correct = 0
  let incorrect = 0
  let unanswered = 0
  let pendingManual = false

  for (const q of questions) {
    const marks = Number(q.marks) || 1
    totalMarks += marks

    const raw = (answers[q.id] ?? '').trim()
    if (!raw) {
      unanswered++
      continue
    }

    const options = questionOptions(q)
    const given = raw.startsWith('opt_') ? (options[Number(raw.slice(4))] ?? '') : raw

    if (q.correctAnswer === undefined || q.correctAnswer === null || q.correctAnswer === '') {
      pendingManual = true
      continue
    }

    const expected =
      typeof q.correctAnswer === 'number'
        ? (options[q.correctAnswer] ?? '')
        : String(q.correctAnswer)
    const ok = q.keywords?.length
      ? q.keywords.some((k) => given.toLowerCase().includes(String(k).toLowerCase()))
      : given.trim().toLowerCase() === expected.trim().toLowerCase()

    if (ok) {
      marksObtained += marks
      correct++
    } else {
      incorrect++
    }
  }

  const percentage = totalMarks > 0 ? Math.round((marksObtained / totalMarks) * 10000) / 100 : 0
  return {
    totalQuestions: questions.length,
    totalMarks,
    marksObtained,
    correct,
    incorrect,
    unanswered,
    percentage,
    pendingManual,
    result: pendingManual ? 'PENDING' : percentage >= passingPercentage ? 'PASS' : 'FAIL',
  }
}

/* --------------------------- result persistence -------------------------- */

export interface EmployeeDetails {
  employeeId: string
  name: string
  city: string
  zone: string
  managerName: string
}

/**
 * Wipe every learning-progress record for one employee: video deliveries,
 * their reminders, assessment submissions and scorecards. The user profile and
 * consent are kept — this resets the journey, not the identity.
 */
export async function resetEmployeeProgress(phone: string, employeeId?: string): Promise<void> {
  const db = getFirestore()
  const normalized = normalizePhone(phone)

  const [deliveries, reminders, submissions, scorecards] = await Promise.all([
    db.collection('videoDeliveries').where('phone', '==', normalized).get(),
    db.collection('scheduledReminders').where('phone', '==', normalized).get(),
    employeeId ? db.collection('assessmentSubmissions').where('employeeId', '==', employeeId).get() : null,
    employeeId ? db.collection('scorecards').where('employeeId', '==', employeeId).get() : null,
  ])

  // ponytail: one batch — Firestore caps it at 500 writes; chunk if an
  // employee can ever exceed that many progress records.
  const batch = db.batch()
  for (const d of deliveries.docs) batch.delete(d.ref)
  for (const d of reminders.docs) batch.delete(d.ref)
  for (const d of submissions?.docs ?? []) batch.delete(d.ref)
  for (const d of scorecards?.docs ?? []) batch.delete(d.ref)
  await batch.commit()
}

export async function saveAssessmentResult(input: {
  employee: EmployeeDetails
  assessmentId: string
  assessmentTitle: string
  moduleNumber?: string
  videoTitle: string
  answers: Record<string, string>
  evaluation: Evaluation
  timeTakenSeconds: number
}): Promise<{ submissionId: string; result: 'PASS' | 'FAIL' | 'PENDING' }> {
  const db = getFirestore()
  const now = new Date().toISOString()
  const result = input.evaluation.result
  const status = result === 'PENDING' ? 'Pending Evaluation' : result

  const submissionRef = await db.collection('assessmentSubmissions').add({
    employeeId: input.employee.employeeId,
    employeeName: input.employee.name,
    assessmentId: input.assessmentId,
    assessmentTitle: input.assessmentTitle,
    moduleNumber: input.moduleNumber ?? '',
    answers: input.answers,
    totalQuestions: input.evaluation.totalQuestions,
    correctAnswers: input.evaluation.correct,
    incorrectAnswers: input.evaluation.incorrect,
    unanswered: input.evaluation.unanswered,
    totalMarks: input.evaluation.totalMarks,
    marksObtained: input.evaluation.marksObtained,
    percentage: input.evaluation.percentage,
    result,
    status,
    submittedAt: now,
  })

  await db.collection('scorecards').add({
    employeeName: input.employee.name,
    employeeId: input.employee.employeeId,
    moduleNumber: input.moduleNumber ?? '',
    videoTitle: input.videoTitle,
    assessmentTitle: input.assessmentTitle,
    totalQuestions: input.evaluation.totalQuestions,
    correctAnswers: input.evaluation.correct,
    incorrectAnswers: input.evaluation.incorrect,
    unanswered: input.evaluation.unanswered,
    totalMarks: input.evaluation.totalMarks,
    marksObtained: input.evaluation.marksObtained,
    percentage: input.evaluation.percentage,
    result,
    status,
    // Fields read by the Scorecards admin table
    score: input.evaluation.marksObtained,
    total: input.evaluation.totalMarks,
    completionDate: now,
    timeTakenSeconds: input.timeTakenSeconds,
    submissionId: submissionRef.id,
    createdAt: now,
  })

  return { submissionId: submissionRef.id, result }
}
