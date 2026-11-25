import { DEFAULT_MESSAGES, renderMessage, withInsertions, type BotInsertion } from './bot-messages'
import { issueCertificateIfComplete } from './certificate-service'
import { resetUserProfile, saveUserProfile, type UserProfile } from './document-service'
import {
  DEFAULT_EMPLOYEE_ID_PATTERN,
  evaluateQuestions,
  getActiveModules,
  getAssessmentForModule,
  getBotCopy,
  getCities,
  getNextModule,
  getQuestionsByIds,
  getRegistrationConfig,
  moduleKey,
  questionOptions,
  resetEmployeeProgress,
  saveAssessmentResult,
  type EmployeeDetails,
  type LearningModule,
} from './learning-service'
import {
  getPendingDelivery,
  markDeliveryComplete,
  recordVideoDelivery,
  type VideoDelivery,
} from './reminder-service'
import { DEFAULT_SESSION_TIMEOUT_MINUTES, getSessionTimeoutMs } from './session-config'
import { videoWatchUrl } from './video-links'

// Refreshed at the start of every processMessage call.
let sessionTtlMs = DEFAULT_SESSION_TIMEOUT_MINUTES * 60 * 1000
// Admin-editable copy (Admin → Bot Messages), also refreshed per message.
let T: Record<string, string> = { ...DEFAULT_MESSAGES }
let insertions: BotInsertion[] = []

function fill(key: string, vars?: Record<string, string | number>): string {
  const body = renderMessage(T[key] ?? DEFAULT_MESSAGES[key] ?? '', vars)
  return withInsertions(key, body, insertions, vars)
}

export interface EmployeeInfo extends EmployeeDetails {
  id?: string
}

export interface BotUser extends EmployeeInfo {
  consentStatus?: 'accepted' | 'declined'
}

export interface AssessmentState {
  assessmentId: string
  title: string
  questionIds: string[]
  index: number
  answers: Record<string, string>
  passingPercentage: number
  moduleNumber?: string
  videoTitle: string
  startedAt: string
}

export interface BotSession {
  currentStep: string
  registration?: {
    employeeId?: string
    name?: string
    city?: string
    zone?: string
    managerName?: string
  }
  registrationClientId?: string
  employee?: EmployeeInfo
  assessment?: AssessmentState
  createdAt: string
  expiresAt: string
}

export type InteractivePayload =
  | { type: 'button'; body: string; buttons: { id: string; title: string }[] }
  | {
      type: 'list'
      body: string
      buttonText: string
      sections: {
        title: string
        rows: { id: string; title: string; description?: string }[]
      }[]
    }

export interface FlowResult {
  message: string
  /** Extra text messages sent before the main reply (e.g. intro, then question). */
  preMessages?: string[]
  interactive?: InteractivePayload
  session: BotSession | null
}

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------
type ProfileField = 'employeeId' | 'name' | 'city' | 'managerName'

const PROFILE_FIELDS: ProfileField[] = ['employeeId', 'name', 'managerName', 'city']

const PROFILE_PROMPT_KEYS: Record<ProfileField, string> = {
  employeeId: 'regEmployeeIdPrompt',
  name: 'regNamePrompt',
  managerName: 'regManagerNamePrompt',
  city: 'regCityPrompt',
}

const CONSENT_BUTTONS = [
  { id: 'consent_yes', titleKey: 'consentYesButton' },
  // WhatsApp rejects reply button titles over 20 characters.
  { id: 'consent_no', titleKey: 'consentNoButton' },
]

function isRegistered(user?: BotUser | null): boolean {
  return (
    !!user &&
    !!user.employeeId &&
    !!user.name &&
    !!user.city &&
    !!user.managerName &&
    user.consentStatus === 'accepted'
  )
}

function createSession(
  step: string,
  overrides?: Partial<BotSession>,
  ttlMs = sessionTtlMs
): BotSession {
  const now = Date.now()
  return {
    currentStep: step,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + ttlMs).toISOString(),
    ...overrides,
  }
}

function askRegistration(session: BotSession, field: ProfileField, note?: string): FlowResult {
  const prompt = fill(PROFILE_PROMPT_KEYS[field])
  return {
    message: note ? `${note}\n\n${prompt}` : prompt,
    session: { ...session, currentStep: `registration_${field}` },
  }
}

function consentPrompt(session: BotSession, note?: string): FlowResult {
  const prompt = fill('consentPrompt')
  const body = note ? `${note}\n\n${prompt}` : prompt
  return {
    message: body,
    interactive: {
      type: 'button',
      body,
      buttons: CONSENT_BUTTONS.map((b) => ({ id: b.id, title: truncate(fill(b.titleKey), 20) })),
    },
    session: { ...session, currentStep: 'consent' },
  }
}

function validEmployeeId(value: string, pattern: string): boolean {
  try {
    return new RegExp(pattern).test(value)
  } catch {
    return new RegExp(DEFAULT_EMPLOYEE_ID_PATTERN).test(value)
  }
}

function truncate(str: string, max: number): string {
  return str.length <= max ? str : str.slice(0, max - 1) + '…'
}

// ---------------------------------------------------------------------------
// Learning journey
// ---------------------------------------------------------------------------
// ponytail: the video is sent as a clickable link. Native WhatsApp video needs
// a publicly reachable MP4 — switch to a video/document message when hosting
// guarantees that.
function videoPrompt(module: LearningModule): string {
  return fill('videoPrompt', {
    moduleHeading: module.moduleNumber
      ? `Module ${module.moduleNumber}: ${module.title}`
      : module.title,
    description: module.description ?? '',
    videoUrl: videoWatchUrl(module.videoUrl),
  })
}

function pendingPrompt(pending: VideoDelivery): string {
  return fill('pendingPrompt', {
    videoTitle: pending.videoTitle,
    videoUrl: videoWatchUrl(pending.videoUrl),
  })
}

async function deliverModule(
  phone: string,
  employee: EmployeeInfo,
  module: LearningModule | null
): Promise<FlowResult> {
  if (!module) {
    // ponytail: certificate PDFs are not generated yet; only announce completion.
    return {
      message: fill('allModulesDone'),
      session: createSession('done', { employee }),
    }
  }

  // Fire-and-forget: the write must not block the user's reply. A follow-up
  // message arrives seconds later (user read + typing time), plenty for the
  // Firestore write to land.
  recordVideoDelivery({
    phone,
    clientId: employee.id,
    clientName: employee.name,
    employeeName: employee.name,
    videoTitle: module.title,
    videoUrl: module.videoUrl,
    moduleNumber: module.moduleNumber,
    deliveredAt: new Date().toISOString(),
  }).catch((e) => console.error('[deliverModule] recordVideoDelivery failed:', e))

  return {
    message: videoPrompt(module),
    session: createSession('awaiting_finish', { employee }),
  }
}

async function deliverNextVideo(
  phone: string,
  employee: EmployeeInfo
): Promise<FlowResult> {
  return deliverModule(phone, employee, await getNextModule(phone))
}

function beginRegistration(user?: BotUser | null): FlowResult {
  const fresh = createSession('registration_employeeId', {
    registration: {},
    registrationClientId: user?.id,
  })
  // Welcome is its own message so it lands separately from the first question.
  return { ...askRegistration(fresh, 'employeeId'), preMessages: [fill('regWelcome')] }
}

async function beginJourney(phone: string, employee: EmployeeInfo): Promise<FlowResult> {
  // Independent reads — fetch together so the reply waits on one round trip.
  const [pending, nextModule] = await Promise.all([
    getPendingDelivery(phone),
    getNextModule(phone),
  ])
  if (pending) {
    return {
      message: pendingPrompt(pending),
      session: createSession('awaiting_finish', { employee }),
    }
  }
  return deliverModule(phone, employee, nextModule)
}

async function startAssessment(
  phone: string,
  pending: VideoDelivery & { id: string },
  employee: EmployeeInfo | null
): Promise<FlowResult> {
  const modules = await getActiveModules()
  const module =
    modules.find((m) => moduleKey(m) === String(pending.moduleNumber ?? pending.videoTitle)) ?? null
  const assessment = await getAssessmentForModule(module)
  const questionIds = assessment?.questionIds ?? []

  if (!assessment || questionIds.length === 0) {
    const done = fill('videoCompleted', { videoTitle: pending.videoTitle })
    if (!employee) {
      return { message: `${done}\n\n${fill('continueHi')}`, session: null }
    }
    const next = await deliverNextVideo(phone, employee)
    return { ...next, message: `${done}\n\n${next.message}` }
  }

  const questions = await getQuestionsByIds(questionIds)
  if (questions.length === 0) {
    const done = fill('videoCompleted', { videoTitle: pending.videoTitle })
    if (!employee) {
      return { message: `${done}\n\n${fill('continueHi')}`, session: null }
    }
    const next = await deliverNextVideo(phone, employee)
    return { ...next, message: `${done}\n\n${next.message}` }
  }

  // ponytail: the session TTL is the de-facto assessment time limit; honour
  // assessment.timeLimit from the builder once it is stored there.
  const session = createSession(
    'assessment_question',
    {
      employee: employee ?? undefined,
      assessment: {
        assessmentId: assessment.id,
        title: assessment.title,
        questionIds: questions.map((q) => q.id),
        index: 0,
        answers: {},
        passingPercentage: assessment.passingPercentage ?? 40,
        moduleNumber: pending.moduleNumber,
        videoTitle: pending.videoTitle,
        startedAt: new Date().toISOString(),
      },
    },
    2 * 60 * 60 * 1000
  )

  // Intro and question are separate WhatsApp messages: the intro alone first.
  return { ...(await questionResult(phone, session)), preMessages: [fill('assessmentIntro')] }
}

async function questionResult(
  phone: string,
  session: BotSession,
  prefix?: string
): Promise<FlowResult> {
  const state = session.assessment!
  const questions = await getQuestionsByIds(state.questionIds)
  const question = questions[state.index]

  // Question list changed underneath us — submit what we have.
  if (!question) return finishAssessment(phone, session)

  const frame = fill('questionFrame', {
    index: state.index + 1,
    total: state.questionIds.length,
    questionText: question.text,
  })
  const body = prefix ? `${prefix}\n\n${frame}` : frame

  const options = questionOptions(question)
  if (options.length === 0) {
    return { message: `${body}\n\n${fill('typeAnswerHint')}`, session }
  }

  return {
    message: body,
    interactive: {
      type: 'list',
      body,
      buttonText: truncate(fill('answerButton'), 20),
      sections: [
        {
          title: 'Options',
          rows: options.map((option, i) => ({ id: `opt_${i}`, title: truncate(option, 24) })),
        },
      ],
    },
    session,
  }
}

async function answerQuestion(
  phone: string,
  session: BotSession,
  interactiveReplyId: string | undefined,
  raw: string
): Promise<FlowResult> {
  const state = session.assessment!
  const questions = await getQuestionsByIds(state.questionIds)
  const question = questions[state.index]
  if (!question) return finishAssessment(phone, session)

  const options = questionOptions(question)
  let answer: string

  if (options.length > 0) {
    if (!interactiveReplyId?.startsWith('opt_')) {
      return questionResult(phone, session, fill('chooseOption'))
    }
    const index = Number(interactiveReplyId.slice(4))
    if (!Number.isInteger(index) || index < 0 || index >= options.length) {
      return questionResult(phone, session, fill('chooseOption'))
    }
    answer = interactiveReplyId
  } else {
    if (!raw) return questionResult(phone, session, fill('pleaseTypeAnswer'))
    if (raw.length > 2000) {
      return questionResult(phone, session, fill('answerTooLong'))
    }
    answer = raw
  }

  const next = {
    ...state,
    index: state.index + 1,
    answers: { ...state.answers, [question.id]: answer },
  }
  const updated = { ...session, assessment: next }

  return next.index < next.questionIds.length
    ? questionResult(phone, updated)
    : finishAssessment(phone, updated)
}

/** Failed quiz: offer a retake instead of asking the user to contact a manager. */
function retakePrompt(body: string, session: BotSession): FlowResult {
  return {
    message: body,
    interactive: {
      type: 'button',
      body,
      buttons: [{ id: 'retake_yes', title: truncate(fill('retakeButton'), 20) }],
    },
    session: { ...session, currentStep: 'awaiting_retake' },
  }
}

async function finishAssessment(phone: string, session: BotSession): Promise<FlowResult> {
  const state = session.assessment!
  const employee = session.employee
  if (!employee) {
    return { message: fill('sessionExpired'), session: null }
  }

  const questions = await getQuestionsByIds(state.questionIds)
  const evaluation = evaluateQuestions(questions, state.answers, state.passingPercentage)
  const timeTakenSeconds = Math.max(
    0,
    Math.round((Date.now() - new Date(state.startedAt).getTime()) / 1000)
  )

  try {
    await saveAssessmentResult({
      employee,
      assessmentId: state.assessmentId,
      assessmentTitle: state.title,
      moduleNumber: state.moduleNumber,
      videoTitle: state.videoTitle,
      answers: state.answers,
      evaluation,
      timeTakenSeconds,
    })
  } catch (error) {
    console.error('[assessment] Failed to save result:', error)
    return {
      message: fill('resultSaveFailed'),
      session: createSession('done', { employee }),
    }
  }

  const result = fill('resultBody', {
    assessmentTitle: state.title,
    totalMarks: evaluation.totalMarks,
    marksObtained: evaluation.marksObtained,
    percentage: evaluation.percentage,
    result: evaluation.result === 'PENDING' ? 'PENDING EVALUATION' : evaluation.result,
  })

  if (evaluation.result === 'PENDING') {
    return {
      message: `${result}\n\n${fill('resultPendingNote')}`,
      session: createSession('done', { employee }),
    }
  }

  if (evaluation.result === 'FAIL') {
    return retakePrompt(
      `${result}\n\n${fill('retakeOffer')}`,
      createSession('awaiting_retake', { employee, assessment: state })
    )
  }

  const next = await deliverNextVideo(phone, employee)

  // Last module finished: issue the certificate if every video is done and
  // every mapped assessment is passed.
  if (next.session?.currentStep === 'done') {
    try {
      const issued = await issueCertificateIfComplete(phone, employee)
      if (issued) {
        return {
          message: [
            result,
            fill('allDone'),
            fill(issued.created ? 'certificateGenerated' : 'certificateExisting', {
              certificateNumber: issued.certificate.certificateNumber,
            }),
          ].join('\n\n'),
          session: next.session,
        }
      }
    } catch (error) {
      console.error('[assessment] certificate issue failed:', error)
    }
    return { message: `${result}\n\n${next.message}`, session: next.session }
  }

  return {
    message: `${result}\n\n${fill('nextModule')}\n\n${next.message}`,
    session: next.session,
  }
}

// ---------------------------------------------------------------------------
// Message entry point
// ---------------------------------------------------------------------------
export async function processMessage(
  phone: string,
  text: string,
  session: BotSession | null,
  interactiveReplyId?: string,
  user?: BotUser | null
): Promise<FlowResult> {
  const [ttlMs, copy] = await Promise.all([getSessionTimeoutMs(), getBotCopy()])
  sessionTtlMs = ttlMs
  T = copy.messages
  insertions = copy.insertions
  const raw = text.trim()
  const input = interactiveReplyId ? interactiveReplyId.trim() : raw.toLowerCase()
  const step = session?.currentStep

  // FINISH is a self-reported video completion. Never treat it as FINISH while
  // a text question is waiting for an answer.
  if (input === 'finish' && step !== 'assessment_question') {
    const pending = await getPendingDelivery(phone)
    if (!pending) {
      return { message: fill('noPendingVideo'), session }
    }
    await markDeliveryComplete(pending.id!)
    return startAssessment(phone, pending, user ?? session?.employee ?? null)
  }

  // Restart wipes learning progress AND registration/consent, then sends the
  // user through registration again from step 1.
  if (input === 'restart' || input === 'start over' || input === 'reset') {
    if (!isRegistered(user)) return beginRegistration(user)
    await resetEmployeeProgress(phone, user!.employeeId)
    await resetUserProfile(phone)
    return beginRegistration(user)
  }

  // Failed assessment: the quiz repeats until it is passed — no way around it.
  if (step === 'awaiting_retake' && session?.assessment) {
    const assessment = session.assessment
    if (input === 'retake_yes' || input === 'retake' || input === 'retake test') {
      const fresh = createSession(
        'assessment_question',
        {
          employee: session.employee,
          assessment: { ...assessment, index: 0, answers: {}, startedAt: new Date().toISOString() },
        },
        2 * 60 * 60 * 1000
      )
      return { ...(await questionResult(phone, fresh)), preMessages: [fill('retakeStart')] }
    }
    return retakePrompt(
      fill('retakeAgain'),
      createSession('awaiting_retake', { employee: session.employee, assessment })
    )
  }

  // Hi / Hello → resume, continue, or start registration
  if (input === 'hi' || input === 'hello') {
    if (step === 'assessment_question' && session?.assessment) {
      return questionResult(phone, session)
    }
    if (isRegistered(user)) {
      return beginJourney(phone, user!)
    }
    return beginRegistration(user)
  }

  // Consent
  if (step === 'consent' && session) {
    if (input === 'consent_yes') {
      const reg = session.registration
      if (!reg?.employeeId || !reg.name || !reg.city || !reg.managerName) {
        return askRegistration(
          createSession('registration_employeeId', {
            registration: {},
            registrationClientId: session.registrationClientId,
          }),
          'employeeId'
        )
      }

      const config = await getRegistrationConfig()
      const profile: UserProfile = {
        employeeId: reg.employeeId,
        name: reg.name,
        city: reg.city,
        zone: reg.zone ?? '',
        managerName: reg.managerName,
        consentStatus: 'accepted',
        consentAt: new Date().toISOString(),
        consentVersion: config.consentVersion,
      }

      let clientId: string
      try {
        clientId = await saveUserProfile(phone, session.registrationClientId ?? null, profile)
      } catch (error) {
        console.error('[registration] Failed to save profile:', error)
        return { message: fill('saveFailed'), session }
      }

      const employee: EmployeeInfo = {
        id: clientId,
        employeeId: profile.employeeId,
        name: profile.name,
        city: profile.city,
        zone: profile.zone ?? '',
        managerName: profile.managerName,
      }
      return deliverNextVideo(phone, employee)
    }

    if (input === 'consent_no') {
      return { message: fill('consentDeclined'), session: null }
    }

    return consentPrompt(session)
  }

  // Registration details, one per message
  if (step?.startsWith('registration_') && session) {
    const field = step.slice('registration_'.length) as ProfileField
    const registration = { ...session.registration }

    if (!raw || raw.length > 100) {
      return askRegistration(session, field, fill('regInvalidEntry'))
    }

    if (field === 'employeeId') {
      const config = await getRegistrationConfig()
      if (!validEmployeeId(raw, config.employeeIdPattern)) {
        return askRegistration(session, field, fill('regInvalidEmployeeId'))
      }
      registration.employeeId = raw
    }

    if (field === 'name') {
      registration.name = raw
    }

    if (field === 'city') {
      const cities = await getCities()
      if (cities.length > 0) {
        const match = cities.find((c) => c.name.toLowerCase() === raw.toLowerCase())
        if (!match) {
          return askRegistration(
            session,
            'city',
            fill('regInvalidCity', { cities: cities.map((c) => c.name).join(', ') })
          )
        }
        registration.city = match.name
        registration.zone = match.zone
      } else {
        registration.city = raw
        registration.zone = ''
      }
    }

    if (field === 'managerName') {
      registration.managerName = raw
    }

    const nextField = PROFILE_FIELDS[PROFILE_FIELDS.indexOf(field) + 1]
    const updated = { ...session, registration }
    const cityNote =
      field === 'city'
        ? fill('regCityAssigned', {
            city: registration.city ?? '',
            zone: registration.zone || 'Not assigned',
          })
        : undefined

    if (nextField) return askRegistration(updated, nextField, cityNote)

    return consentPrompt(updated, cityNote)
  }

  // Assessment question
  if (step === 'assessment_question' && session?.assessment) {
    return answerQuestion(phone, session, interactiveReplyId, raw)
  }

  // Video is pending
  if (step === 'awaiting_finish' && session) {
    const pending = await getPendingDelivery(phone)
    if (pending) return { message: pendingPrompt(pending), session }
    if (isRegistered(user)) {
      return deliverNextVideo(phone, user!)
    }
  }

  return {
    message: fill('fallback'),
    session: null,
  }
}
