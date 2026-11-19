import { issueCertificateIfComplete } from './certificate-service'
import { resetUserProfile, saveUserProfile, type UserProfile } from './document-service'
import {
  DEFAULT_EMPLOYEE_ID_PATTERN,
  evaluateQuestions,
  getActiveModules,
  getAssessmentForModule,
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

// Refreshed at the start of every processMessage call (Admin → Settings).
let sessionTtlMs = DEFAULT_SESSION_TIMEOUT_MINUTES * 60 * 1000

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
  interactive?: InteractivePayload
  session: BotSession | null
}

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------
type ProfileField = 'employeeId' | 'name' | 'city' | 'managerName'

const PROFILE_FIELDS: ProfileField[] = ['employeeId', 'name', 'managerName', 'city']

const PROFILE_PROMPTS: Record<ProfileField, string> = {
  employeeId:
    "Welcome to Edventure! Let's get started with your learning journey.\n\nPlease provide the following details.\n\n1/4 — Employee ID:",
  name: '2/4 — Employee Name:',
  managerName: '3/4 — Manager Name:',
  city: '4/4 — City:',
}

const CONSENT_TEXT =
  'Do you consent to Edventure recording and processing your registration information for managing your learning journey and assessments?'

const CONSENT_BUTTONS = [
  { id: 'consent_yes', title: 'YES - I Consent' },
  // WhatsApp rejects reply button titles over 20 characters.
  { id: 'consent_no', title: 'NO - Do Not Consent' },
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
  return {
    message: note ? `${note}\n\n${PROFILE_PROMPTS[field]}` : PROFILE_PROMPTS[field],
    session: { ...session, currentStep: `registration_${field}` },
  }
}

function consentPrompt(session: BotSession, note?: string): FlowResult {
  const body = note ? `${note}\n\n${CONSENT_TEXT}` : CONSENT_TEXT
  return {
    message: body,
    interactive: { type: 'button', body, buttons: CONSENT_BUTTONS },
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
  const heading = module.moduleNumber
    ? `Module ${module.moduleNumber}: ${module.title}`
    : module.title
  return [
    "Welcome to Edventure! Let's continue your learning journey. Here is your learning video for today.",
    '',
    heading,
    ...(module.description ? [module.description] : []),
    ...(module.videoUrl ? ['', `Watch here: ${module.videoUrl}`] : []),
    '',
    'Please watch the complete video and type FINISH once you have completed watching it.',
  ].join('\n')
}

function pendingPrompt(pending: VideoDelivery): string {
  return [
    `Your learning video "${pending.videoTitle}" is still pending.`,
    ...(pending.videoUrl ? ['', `Watch here: ${pending.videoUrl}`] : []),
    '',
    'Please watch the complete video and type FINISH once you have completed watching it.',
  ].join('\n')
}

async function deliverNextVideo(
  phone: string,
  employee: EmployeeInfo
): Promise<FlowResult> {
  const module = await getNextModule(phone)
  if (!module) {
    // ponytail: certificate PDFs are not generated yet; only announce completion.
    return {
      message:
        'You have completed all available learning modules.\n\nYour certificate will be shared with you once it has been generated.',
      session: createSession('done', { employee }),
    }
  }

  await recordVideoDelivery({
    phone,
    clientId: employee.id,
    clientName: employee.name,
    employeeName: employee.name,
    videoTitle: module.title,
    videoUrl: module.videoUrl,
    moduleNumber: module.moduleNumber,
    deliveredAt: new Date().toISOString(),
  })

  return {
    message: videoPrompt(module),
    session: createSession('awaiting_finish', { employee }),
  }
}

function beginRegistration(user?: BotUser | null): FlowResult {
  const fresh = createSession('registration_employeeId', {
    registration: {},
    registrationClientId: user?.id,
  })
  return askRegistration(fresh, 'employeeId')
}

async function beginJourney(phone: string, employee: EmployeeInfo): Promise<FlowResult> {
  const pending = await getPendingDelivery(phone)
  if (pending) {
    return {
      message: pendingPrompt(pending),
      session: createSession('awaiting_finish', { employee }),
    }
  }
  return deliverNextVideo(phone, employee)
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
    const done = `Great job! Your video "${pending.videoTitle}" has been marked as completed.`
    if (!employee) {
      return { message: `${done}\n\nPlease type Hi to continue.`, session: null }
    }
    const next = await deliverNextVideo(phone, employee)
    return { ...next, message: `${done}\n\n${next.message}` }
  }

  const questions = await getQuestionsByIds(questionIds)
  if (questions.length === 0) {
    const done = `Great job! Your video "${pending.videoTitle}" has been marked as completed.`
    if (!employee) {
      return { message: `${done}\n\nPlease type Hi to continue.`, session: null }
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

  return questionResult(
    phone,
    session,
    "Congratulations! You have completed the learning video. Now let's test your understanding."
  )
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

  const body = [
    ...(prefix ? [`${prefix}`, ''] : []),
    `Question ${state.index + 1} of ${state.questionIds.length}`,
    '',
    question.text,
  ].join('\n')

  const options = questionOptions(question)
  if (options.length === 0) {
    return { message: `${body}\n\nType your answer.`, session }
  }

  return {
    message: body,
    interactive: {
      type: 'list',
      body,
      buttonText: 'Answer',
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
      return questionResult(phone, session, 'Please choose one of the options.')
    }
    const index = Number(interactiveReplyId.slice(4))
    if (!Number.isInteger(index) || index < 0 || index >= options.length) {
      return questionResult(phone, session, 'Please choose one of the options.')
    }
    answer = interactiveReplyId
  } else {
    if (!raw) return questionResult(phone, session, 'Please type your answer.')
    if (raw.length > 2000) {
      return questionResult(
        phone,
        session,
        'Your answer is too long. Please keep it under 2000 characters.'
      )
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
    interactive: { type: 'button', body, buttons: [{ id: 'retake_yes', title: 'Retake Test' }] },
    session: { ...session, currentStep: 'awaiting_retake' },
  }
}

async function finishAssessment(phone: string, session: BotSession): Promise<FlowResult> {
  const state = session.assessment!
  const employee = session.employee
  if (!employee) {
    return { message: 'Your session has expired. Please type Hi to continue.', session: null }
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
      message: 'Your assessment was submitted, but the result could not be saved. Please contact your administrator.',
      session: createSession('done', { employee }),
    }
  }

  const lines = [
    `Your ${state.title} is complete!`,
    '',
    `Total Marks: ${evaluation.totalMarks}`,
    `Marks Obtained: ${evaluation.marksObtained}`,
    `Percentage: ${evaluation.percentage}%`,
    `Result: ${evaluation.result === 'PENDING' ? 'PENDING EVALUATION' : evaluation.result}`,
  ]

  if (evaluation.result === 'PENDING') {
    lines.push('', 'Your answers have been submitted and will be reviewed by your manager.')
    return { message: lines.join('\n'), session: createSession('done', { employee }) }
  }

  if (evaluation.result === 'FAIL') {
    lines.push('', 'You did not meet the passing percentage. Tap Retake Test to try again.')
    return retakePrompt(
      lines.join('\n'),
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
        lines.push(
          '',
          'Congratulations! You have completed every learning module.',
          issued.created
            ? `Your certificate has been generated — Certificate ID ${issued.certificate.certificateNumber}.`
            : `Your certificate is already issued — Certificate ID ${issued.certificate.certificateNumber}.`
        )
        return { message: lines.join('\n'), session: next.session }
      }
    } catch (error) {
      console.error('[assessment] certificate issue failed:', error)
    }
    return { message: `${lines.join('\n')}\n\n${next.message}`, session: next.session }
  }

  lines.push('', 'Congratulations! You are ready for the next learning module.')
  return { message: `${lines.join('\n')}\n\n${next.message}`, session: next.session }
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
  sessionTtlMs = await getSessionTimeoutMs()
  const raw = text.trim()
  const input = interactiveReplyId ? interactiveReplyId.trim() : raw.toLowerCase()
  const step = session?.currentStep

  // FINISH is a self-reported video completion. Never treat it as FINISH while
  // a text question is waiting for an answer.
  if (input === 'finish' && step !== 'assessment_question') {
    const pending = await getPendingDelivery(phone)
    if (!pending) {
      return {
        message: 'You have no pending learning video. Type Hi to continue your journey.',
        session,
      }
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
      return questionResult(phone, fresh, 'Retaking the assessment. Good luck!')
    }
    return retakePrompt(
      'You did not meet the passing percentage. Tap Retake Test when you are ready to try again.',
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
        return {
          message: 'Sorry, we could not save your details. Please try again later.',
          session,
        }
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
      return {
        message:
          'Thank you for your time. Your registration details have not been saved and your learning journey will not be started.',
        session: null,
      }
    }

    return consentPrompt(session)
  }

  // Registration details, one per message
  if (step?.startsWith('registration_') && session) {
    const field = step.slice('registration_'.length) as ProfileField
    const registration = { ...session.registration }

    if (!raw || raw.length > 100) {
      return askRegistration(session, field, 'That entry looks invalid. Please try again.')
    }

    if (field === 'employeeId') {
      const config = await getRegistrationConfig()
      if (!validEmployeeId(raw, config.employeeIdPattern)) {
        return askRegistration(
          session,
          field,
          'That Employee ID format is not valid. Please enter it again.'
        )
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
            `City not recognised. Available cities: ${cities.map((c) => c.name).join(', ')}`
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
        ? `Thank you! Your registered city is ${registration.city}, and your assigned zone is ${registration.zone || 'Not assigned'}.`
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
    message: "Please send 'Hi' to start.",
    session: null,
  }
}
