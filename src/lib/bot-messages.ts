/**
 * Admin-editable bot copy (Admin → Bot Messages).
 *
 * Every user-facing string in the Hi → certificate flow lives here as a
 * default. Overrides are stored in Firestore `config/botMessages` keyed by
 * `key`; anything missing or blank falls back to the default below.
 * `{placeholders}` are filled in at send time by renderMessage().
 */
export interface MessageDef {
  key: string
  label: string
  group: string
  default: string
  placeholders?: string[]
  /** Button labels cannot host inserted messages (20-char WhatsApp limit). */
  insertable?: boolean
}

export const MESSAGE_GROUPS = [
  'Greeting & registration',
  'Consent',
  'Learning videos',
  'Assessment',
  'Results & completion',
  'Fallback',
]

export const MESSAGE_DEFS: MessageDef[] = [
  {
    key: 'regWelcome',
    group: 'Greeting & registration',
    label: 'Welcome message (sent before the first question)',
    default: "Welcome to Edventure! Let's get started with your learning journey.",
  },
  {
    key: 'regEmployeeIdPrompt',
    group: 'Greeting & registration',
    label: 'Registration 1/4 — Employee ID',
    default: 'Please provide the following details.\n\n1/4 — Employee ID:',
  },
  {
    key: 'regNamePrompt',
    group: 'Greeting & registration',
    label: 'Registration 2/4 — Employee name',
    default: '2/4 — Employee Name:',
  },
  {
    key: 'regManagerNamePrompt',
    group: 'Greeting & registration',
    label: 'Registration 3/4 — Manager name',
    default: '3/4 — Manager Name:',
  },
  {
    key: 'regCityPrompt',
    group: 'Greeting & registration',
    label: 'Registration 4/4 — City',
    default: '4/4 — City:',
  },
  {
    key: 'regInvalidEntry',
    group: 'Greeting & registration',
    label: 'Invalid entry note (prefixes the prompt again)',
    default: 'That entry looks invalid. Please try again.',
  },
  {
    key: 'regInvalidEmployeeId',
    group: 'Greeting & registration',
    label: 'Employee ID format rejected',
    default: 'That Employee ID format is not valid. Please enter it again.',
  },
  {
    key: 'regInvalidCity',
    group: 'Greeting & registration',
    label: 'City not in City & Zone list',
    default: 'City not recognised. Available cities: {cities}',
    placeholders: ['cities'],
  },
  {
    key: 'regCityAssigned',
    group: 'Greeting & registration',
    label: 'City/zone confirmation before consent',
    default:
      'Thank you! Your registered city is {city}, and your assigned zone is {zone}.',
    placeholders: ['city', 'zone'],
  },
  {
    key: 'consentPrompt',
    group: 'Consent',
    label: 'Consent question',
    default:
      'Do you consent to Edventure recording and processing your registration information for managing your learning journey and assessments?',
  },
  {
    key: 'consentYesButton',
    group: 'Consent',
    label: 'Consent — Yes button label',
    default: 'YES - I Consent',
    insertable: false,
  },
  {
    key: 'consentNoButton',
    group: 'Consent',
    label: 'Consent — No button label',
    default: 'NO - Do Not Consent',
    insertable: false,
  },
  {
    key: 'consentDeclined',
    group: 'Consent',
    label: 'Reply after consent is declined',
    default:
      'Thank you for your time. Your registration details have not been saved and your learning journey will not be started.',
  },
  {
    key: 'saveFailed',
    group: 'Consent',
    label: 'Reply when profile save fails',
    default: 'Sorry, we could not save your details. Please try again later.',
  },
  {
    key: 'videoPrompt',
    group: 'Learning videos',
    label: 'Learning video delivery',
    default:
      "Welcome to Edventure! Let's continue your learning journey. Here is your learning video for today.\n\n{moduleHeading}\n{description}\n\nWatch here: {videoUrl}\n\nPlease watch the complete video and type FINISH once you have completed watching it.",
    placeholders: ['moduleHeading', 'description', 'videoUrl'],
  },
  {
    key: 'pendingPrompt',
    group: 'Learning videos',
    label: 'Pending video reminder (on Hi)',
    default:
      'Your learning video "{videoTitle}" is still pending.\n\nWatch here: {videoUrl}\n\nPlease watch the complete video and type FINISH once you have completed watching it.',
    placeholders: ['videoTitle', 'videoUrl'],
  },
  {
    key: 'noPendingVideo',
    group: 'Learning videos',
    label: 'FINISH sent with no pending video',
    default: 'You have no pending learning video. Type Hi to continue your journey.',
  },
  {
    key: 'videoCompleted',
    group: 'Learning videos',
    label: 'Video marked complete',
    default: 'Great job! Your video "{videoTitle}" has been marked as completed.',
    placeholders: ['videoTitle'],
  },
  {
    key: 'continueHi',
    group: 'Learning videos',
    label: '“Type Hi to continue” line',
    default: 'Please type Hi to continue.',
  },
  {
    key: 'allModulesDone',
    group: 'Learning videos',
    label: 'All modules completed (no certificate yet)',
    default:
      'You have completed all available learning modules.\n\nYour certificate will be shared with you once it has been generated.',
  },
  {
    key: 'assessmentIntro',
    group: 'Assessment',
    label: 'Intro before question 1',
    default:
      "Congratulations! You have completed the learning video. Now let's test your understanding. (Only 2 attempts allowed)",
  },
  {
    key: 'questionFrame',
    group: 'Assessment',
    label: 'Question header + question text',
    default: 'Question {index} of {total}\n\n{questionText}',
    placeholders: ['index', 'total', 'questionText'],
  },
  {
    key: 'typeAnswerHint',
    group: 'Assessment',
    label: 'Hint for typed text answers',
    default: 'Type your answer.',
  },
  {
    key: 'answerButton',
    group: 'Assessment',
    label: 'Answer list button label',
    default: 'Answer',
    insertable: false,
  },
  {
    key: 'chooseOption',
    group: 'Assessment',
    label: 'Invalid/missing option picked',
    default: 'Please choose one of the options.',
  },
  {
    key: 'pleaseTypeAnswer',
    group: 'Assessment',
    label: 'Empty text answer',
    default: 'Please type your answer.',
  },
  {
    key: 'answerTooLong',
    group: 'Assessment',
    label: 'Text answer over 2000 characters',
    default: 'Your answer is too long. Please keep it under 2000 characters.',
  },
  {
    key: 'retakeStart',
    group: 'Assessment',
    label: 'Retake started',
    default: 'Retaking the assessment. Good luck!',
  },
  {
    key: 'retakeOffer',
    group: 'Assessment',
    label: 'Fail — “try again” line',
    default: 'You did not meet the passing percentage. Tap Retake Test to try again.',
  },
  {
    key: 'retakeAgain',
    group: 'Assessment',
    label: 'Fail — reply while waiting for retake',
    default:
      'You did not meet the passing percentage. Tap Retake Test when you are ready to try again.',
  },
  {
    key: 'retakeButton',
    group: 'Assessment',
    label: 'Retake Test button label',
    default: 'Retake Test',
    insertable: false,
  },
  {
    key: 'resultBody',
    group: 'Results & completion',
    label: 'Scorecard block',
    default:
      'Your {assessmentTitle} is complete!\n\nTotal Marks: {totalMarks}\nMarks Obtained: {marksObtained}\nPercentage: {percentage}%\nResult: {result}',
    placeholders: ['assessmentTitle', 'totalMarks', 'marksObtained', 'percentage', 'result'],
  },
  {
    key: 'resultPendingNote',
    group: 'Results & completion',
    label: 'Result pending manual review',
    default: 'Your answers have been submitted and will be reviewed by your manager.',
  },
  {
    key: 'nextModule',
    group: 'Results & completion',
    label: 'Passed — next module line',
    default: 'Congratulations! You are ready for the next learning module.',
  },
  {
    key: 'resultSaveFailed',
    group: 'Results & completion',
    label: 'Reply when the result cannot be saved',
    default:
      'Your assessment was submitted, but the result could not be saved. Please contact your administrator.',
  },
  {
    key: 'sessionExpired',
    group: 'Results & completion',
    label: 'Session expired',
    default: 'Your session has expired. Please type Hi to continue.',
  },
  {
    key: 'allDone',
    group: 'Results & completion',
    label: 'Every module and assessment passed',
    default: 'Congratulations! You have completed every learning module.',
  },
  {
    key: 'certificateGenerated',
    group: 'Results & completion',
    label: 'Certificate newly generated',
    default: 'Your certificate has been generated — Certificate ID {certificateNumber}.',
    placeholders: ['certificateNumber'],
  },
  {
    key: 'certificateExisting',
    group: 'Results & completion',
    label: 'Certificate already issued',
    default: 'Your certificate is already issued — Certificate ID {certificateNumber}.',
    placeholders: ['certificateNumber'],
  },
  {
    key: 'fallback',
    group: 'Fallback',
    label: 'Unrecognised message',
    default: "Please send 'Hi' to start.",
  },
]

export const DEFAULT_MESSAGES: Record<string, string> = Object.fromEntries(
  MESSAGE_DEFS.map((m) => [m.key, m.default])
)

/** An extra message the admin inserted before/after a flow message. */
export interface BotInsertion {
  id: string
  /** MESSAGE_DEFS key this message is sent alongside. */
  anchorKey: string
  position: 'before' | 'after'
  text: string
}

export function isBotInsertion(value: unknown): value is BotInsertion {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'string' &&
    typeof v.anchorKey === 'string' &&
    v.anchorKey in DEFAULT_MESSAGES &&
    (v.position === 'before' || v.position === 'after') &&
    typeof v.text === 'string'
  )
}

/** Fill `{placeholder}` tokens; unknown tokens are left visible on purpose. */
export function renderMessage(
  template: string,
  vars: Record<string, string | number> = {}
): string {
  return template
    .replace(/\{(\w+)\}/g, (_, key: string) =>
      key in vars ? String(vars[key]) : `{${key}}`
    )
    // Empty optional values should not leave stray blank lines.
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * Wrap a flow message with the admin's inserted before/after messages, so an
 * added message is delivered in the same WhatsApp reply at that point of the flow.
 */
export function withInsertions(
  key: string,
  body: string,
  insertions: BotInsertion[],
  vars: Record<string, string | number> = {}
): string {
  const rendered = insertions
    .filter((i) => i.anchorKey === key)
    .map((i) => ({ position: i.position, text: renderMessage(i.text, vars) }))
    .filter((i) => i.text)
  const before = rendered.filter((i) => i.position === 'before').map((i) => i.text)
  const after = rendered.filter((i) => i.position === 'after').map((i) => i.text)
  return [...before, body, ...after].filter(Boolean).join('\n\n')
}
