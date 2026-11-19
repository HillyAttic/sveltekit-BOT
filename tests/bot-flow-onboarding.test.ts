import { describe, it, expect, vi, beforeEach } from 'vitest'

const savedProfile = vi.fn(async (..._args: any[]) => 'u1')
const recordedDelivery = vi.fn(async (..._args: any[]) => 'd1')
const saveResult = vi.fn(async (..._args: any[]) => ({ submissionId: 's1', result: 'PASS' }))
let pending: any = null
let moduleAvailable = true

vi.mock('#lib/document-service', () => ({
  saveUserProfile: (...args: any[]) => savedProfile(...args),
}))

vi.mock('#lib/learning-service', async (importOriginal) => {
  const actual = await importOriginal<typeof import('#lib/learning-service')>()
  return {
    ...actual,
    getRegistrationConfig: async () => ({
      employeeIdPattern: actual.DEFAULT_EMPLOYEE_ID_PATTERN,
      consentVersion: 'v1',
    }),
    getCities: async () => [
      { id: 'c1', name: 'Delhi', zone: 'North' },
      { id: 'c2', name: 'Mumbai', zone: 'West' },
    ],
    getActiveModules: async () => [
      { id: 'm1', title: 'Intro Video', videoUrl: 'https://v/1', moduleNumber: '1' },
    ],
    getAssessmentForModule: async () => ({
      id: 'a1',
      title: 'Assessment 1',
      questionIds: ['q1'],
      passingPercentage: 50,
    }),
    getQuestionsByIds: async (ids: string[]) =>
      ids.map((id) => ({
        id,
        text: 'What is 2+2?',
        type: 'mcq',
        options: ['4', '5'],
        correctAnswer: '4',
        marks: 10,
      })),
    getNextModule: async () =>
      moduleAvailable ? { id: 'm1', title: 'Intro Video', videoUrl: 'https://v/1', moduleNumber: '1' } : null,
    saveAssessmentResult: (...args: any[]) => saveResult(...args),
  }
})

vi.mock('#lib/reminder-service', () => ({
  getPendingDelivery: async () => pending,
  markDeliveryComplete: async () => {
    pending = null
  },
  recordVideoDelivery: (...args: any[]) => {
    moduleAvailable = false
    pending = { id: 'd1', ...args[0], status: 'pending' }
    return recordedDelivery(...args)
  },
}))

import { processMessage } from '#lib/bot-flow'

const REGISTERED_USER = {
  id: 'u1',
  employeeId: 'EMP-42',
  name: 'Ravi Sharma',
  city: 'Delhi',
  zone: 'North',
  managerName: 'Asha Rao',
  consentStatus: 'accepted' as const,
}

describe('updated WhatsApp flow', () => {
  beforeEach(() => {
    savedProfile.mockClear()
    recordedDelivery.mockClear()
    saveResult.mockClear()
    pending = null
    moduleAvailable = true
  })

  it('registers an employee, validates input, records consent and sends the first video', async () => {
    let step = await processMessage('91999', 'hi', null, undefined, null)
    expect(step.session?.currentStep).toBe('registration_employeeId')
    expect(step.message).toContain('Employee ID')

    step = await processMessage('91999', 'bad id!', step.session, undefined, null)
    expect(step.session?.currentStep).toBe('registration_employeeId')
    expect(step.message).toContain('not valid')

    step = await processMessage('91999', 'EMP-42', step.session, undefined, null)
    expect(step.session?.currentStep).toBe('registration_name')

    step = await processMessage('91999', 'Ravi Sharma', step.session, undefined, null)
    expect(step.session?.currentStep).toBe('registration_managerName')

    step = await processMessage('91999', 'Asha Rao', step.session, undefined, null)
    expect(step.session?.currentStep).toBe('registration_city')

    step = await processMessage('91999', 'Atlantis', step.session, undefined, null)
    expect(step.session?.currentStep).toBe('registration_city')
    expect(step.message).toContain('Delhi')

    step = await processMessage('91999', 'Delhi', step.session, undefined, null)
    expect(step.session?.currentStep).toBe('consent')
    expect(step.message).toContain('zone is North')
    expect(step.interactive?.type).toBe('button')
    if (step.interactive?.type === 'button') {
      for (const b of step.interactive.buttons) expect(b.title.length).toBeLessThanOrEqual(20)
    }

    step = await processMessage('91999', 'no', step.session, 'consent_no', null)
    expect(step.session).toBeNull()
    expect(savedProfile).not.toHaveBeenCalled()

    // Re-run up to consent, then accept
    step = await processMessage('91999', 'hi', null, undefined, null)
    step = await processMessage('91999', 'EMP-42', step.session, undefined, null)
    step = await processMessage('91999', 'Ravi Sharma', step.session, undefined, null)
    step = await processMessage('91999', 'Asha Rao', step.session, undefined, null)
    step = await processMessage('91999', 'Delhi', step.session, undefined, null)

    step = await processMessage('91999', 'yes', step.session, 'consent_yes', null)
    expect(savedProfile).toHaveBeenCalledWith(
      '91999',
      null,
      expect.objectContaining({
        employeeId: 'EMP-42',
        name: 'Ravi Sharma',
        city: 'Delhi',
        zone: 'North',
        managerName: 'Asha Rao',
        consentStatus: 'accepted',
        consentVersion: 'v1',
      })
    )
    expect(recordedDelivery).toHaveBeenCalledWith(
      expect.objectContaining({ videoTitle: 'Intro Video', moduleNumber: '1' })
    )
    expect(step.message).toContain('FINISH')
    expect(step.session?.currentStep).toBe('awaiting_finish')
  })

  it('reminds a registered employee whose video is still pending', async () => {
    pending = {
      id: 'd1',
      phone: '91999',
      videoTitle: 'Intro Video',
      videoUrl: 'https://v/1',
      moduleNumber: '1',
      status: 'pending',
    }
    const step = await processMessage('91999', 'hi', null, undefined, REGISTERED_USER)
    expect(step.message).toContain('still pending')
    expect(step.message).toContain('FINISH')
  })

  it('restart abandons an in-progress assessment and starts the journey again', async () => {
    const session = {
      currentStep: 'assessment_question',
      employee: { ...REGISTERED_USER },
      assessment: {
        assessmentId: 'a1',
        title: 'Assessment 1',
        questionIds: ['q1'],
        index: 0,
        answers: {},
        passingPercentage: 50,
        videoTitle: 'Intro Video',
        startedAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 60_000).toISOString(),
    }

    const step = await processMessage('91999', 'restart', session as any, undefined, REGISTERED_USER)
    expect(step.session?.currentStep).toBe('awaiting_finish')
    expect(step.message).toContain('FINISH')
    expect(step.message).not.toContain('Question 1 of')
  })

  it('restart sends an unregistered user back to registration', async () => {
    const step = await processMessage('91999', 'restart', null, undefined, null)
    expect(step.session?.currentStep).toBe('registration_employeeId')
    expect(step.message).toContain('Employee ID')
  })

  it('delivers an assessment after FINISH and sends the scorecard', async () => {
    pending = {
      id: 'd1',
      phone: '91999',
      videoTitle: 'Intro Video',
      moduleNumber: '1',
      status: 'pending',
    }
    moduleAvailable = false // this was the last module

    let step = await processMessage('91999', 'finish', null, undefined, REGISTERED_USER)
    expect(step.session?.currentStep).toBe('assessment_question')
    expect(step.message).toContain('What is 2+2?')
    expect(step.interactive?.type).toBe('list')

    step = await processMessage('91999', '4', step.session, 'opt_0', REGISTERED_USER)
    expect(saveResult).toHaveBeenCalledOnce()
    expect(saveResult.mock.calls[0][0].evaluation.result).toBe('PASS')
    expect(step.message).toContain('Marks Obtained: 10')
    expect(step.message).toContain('Result: PASS')
    expect(step.message).toContain('completed all available learning modules')
  })
})
