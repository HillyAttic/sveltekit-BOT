import { DEFAULT_MESSAGES, isBotInsertion, type BotInsertion } from './bot-messages'
import { getFirestore } from './firebase-admin'
import { normalizePhone } from './phone'

/* ------------------------------- read cache ------------------------------ */

/**
 * Tiny TTL memo for read-mostly config. One Firestore read per TTL per isolate
 * instead of one per bot message; concurrent misses share a single request.
 */
const memo = new Map<string, { value: unknown; at: number }>()
const inflight = new Map<string, Promise<unknown>>()

function cached<T>(key: string, ttlMs: number, load: () => Promise<T>): Promise<T> {
  const hit = memo.get(key)
  if (hit && Date.now() - hit.at < ttlMs) return Promise.resolve(hit.value as T)

  const running = inflight.get(key)
  if (running) return running as Promise<T>

  const request = load()
    .then((value) => {
      memo.set(key, { value, at: Date.now() })
      return value
    })
    .finally(() => inflight.delete(key))
  inflight.set(key, request)
  return request
}

/** Drop memoized learning data (used when admin edits learning collections). */
export function clearLearningCache(): void {
  memo.clear()
  inflight.clear()
}

/* ------------------------------ registration ----------------------------- */

export const DEFAULT_EMPLOYEE_ID_PATTERN = '^[A-Za-z0-9._-]{3,30}$'

export function getRegistrationConfig(): Promise<{
  employeeIdPattern: string
  consentVersion: string
}> {
  return cached('registration-config', 60_000, async () => {
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
  })
}

/* ------------------------------ bot copy --------------------------------- */

/**
 * Admin-edited bot copy (`config/botMessages`): text overrides merged over the
 * defaults in bot-messages.ts, plus extra messages inserted between flow steps.
 */
export function getBotCopy(): Promise<{
  messages: Record<string, string>
  insertions: BotInsertion[]
}> {
  return cached('bot-messages', 60_000, async () => {
    try {
      const doc = await getFirestore().collection('config').doc('botMessages').get()
      const stored = doc.exists ? (doc.data() ?? {}) : {}
      const overrides = Object.fromEntries(
        Object.entries(stored).filter(
          ([key, v]) => key !== 'insertions' && typeof v === 'string' && v.trim() !== ''
        )
      ) as Record<string, string>
      const insertions = Array.isArray(stored.insertions)
        ? stored.insertions.filter(isBotInsertion)
        : []
      return { messages: { ...DEFAULT_MESSAGES, ...overrides }, insertions }
    } catch (error) {
      console.error('[bot] message copy read failed, using defaults:', error)
      return { messages: { ...DEFAULT_MESSAGES }, insertions: [] }
    }
  })
}

/* --------------------------------- cities -------------------------------- */

export interface CityZone {
  id: string
  name: string
  zone: string
}

/** Cities configured in the admin City & Zone page, with their zone mapping. */
export function getCities(): Promise<CityZone[]> {
  return cached('cities', 60_000, async () => {
    const snap = await getFirestore().collection('cities').get()
    return snap.docs
      .map((d) => {
        const data = d.data()
        return { id: d.id, name: String(data.name ?? '').trim(), zone: String(data.zone ?? '').trim() }
      })
      .filter((c) => c.name)
  })
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
  /** Learning video this assessment belongs to (learningModules doc id). */
  moduleId?: string
  /** Legacy link from before assessments were mapped in the builder. */
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

export function getActiveModules(): Promise<LearningModule[]> {
  // 30s staleness at most: a newly published module reaches the bot almost at once.
  return cached('active-modules', 30_000, async () => {
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
 * The assessment explicitly mapped to this video in the Assessment Builder,
 * or null when the video has none (the bot then just moves to the next video).
 */
export async function getAssessmentForModule(
  module: LearningModule | null
): Promise<Assessment | null> {
  if (!module) return null
  const snap = await getFirestore().collection('assessments').get()
  const assessments = snap.docs.map((d) => ({ ...(d.data() as Omit<Assessment, 'id'>), id: d.id }))
  return (
    assessments.find((a) => a.moduleId === module.id) ??
    (module.moduleNumber
      ? assessments.find((a) => String(a.moduleNumber ?? '') === String(module.moduleNumber))
      : undefined) ??
    null
  )
}

export function getQuestionsByIds(ids: string[]): Promise<Question[]> {
  if (ids.length === 0) return Promise.resolve([])
  // Parallel doc reads (one round trip, no full-collection scan) + short memo:
  // answering a question used to read the whole questions collection twice.
  return cached(`questions:${ids.join('|')}`, 30_000, async () => {
    const db = getFirestore()
    const docs = await Promise.all(ids.map((id) => db.collection('questions').doc(id).get()))
    return docs
      .filter((d) => d.exists)
      .map((d) => ({ ...(d.data() as Omit<Question, 'id'>), id: d.id }))
  })
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
 * their reminders, assessment submissions, scorecards and any certificate
 * already issued. The user profile and consent are kept — this resets the
 * journey, not the identity.
 */
export async function resetEmployeeProgress(phone: string, employeeId?: string): Promise<void> {
  const db = getFirestore()
  const normalized = normalizePhone(phone)

  const [deliveries, reminders, submissions, scorecards, certificates] = await Promise.all([
    db.collection('videoDeliveries').where('phone', '==', normalized).get(),
    db.collection('scheduledReminders').where('phone', '==', normalized).get(),
    employeeId ? db.collection('assessmentSubmissions').where('employeeId', '==', employeeId).get() : null,
    employeeId ? db.collection('scorecards').where('employeeId', '==', employeeId).get() : null,
    employeeId ? db.collection('certificates').where('employeeId', '==', employeeId).get() : null,
  ])

  // ponytail: one batch — Firestore caps it at 500 writes; chunk if an
  // employee can ever exceed that many progress records.
  const batch = db.batch()
  for (const d of deliveries.docs) batch.delete(d.ref)
  for (const d of reminders.docs) batch.delete(d.ref)
  for (const d of submissions?.docs ?? []) batch.delete(d.ref)
  for (const d of scorecards?.docs ?? []) batch.delete(d.ref)
  for (const d of certificates?.docs ?? []) batch.delete(d.ref)
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
