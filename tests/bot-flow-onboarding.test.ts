import { describe, it, expect, vi, beforeEach } from 'vitest'

const saved = vi.fn(async (..._args: any[]) => 'new-user-id')

vi.mock('#lib/document-service', () => ({
  getCategories: async () => ({ 'Audit Report': { fiscalYears: ['2024-25'], subCategories: [] } }),
  getFilteredDocuments: async () => [],
  saveUserProfile: (...args: any[]) => saved(...args),
}))
vi.mock('#lib/storage-service', () => ({ generateSignedUrl: async () => 'https://x' }))
vi.mock('#lib/chat-logger', () => ({ recordDocumentAccess: async () => {} }))
vi.mock('#lib/reminder-service', () => ({
  getPendingDelivery: async () => null,
  markDeliveryComplete: async () => {},
}))

import { processMessage } from '#lib/bot-flow'

describe('onboarding on Hi', () => {
  beforeEach(() => saved.mockClear())

  it('asks Employee ID, name, city and manager before showing the menu', async () => {
    let step = await processMessage('91999', 'hi', null, undefined, [])
    expect(step.session?.currentStep).toBe('onboarding_employeeId')
    expect(step.message).toContain('Employee ID')

    step = await processMessage('91999', 'EMP-42', step.session)
    expect(step.session?.currentStep).toBe('onboarding_name')
    expect(step.message).toContain('full name')

    step = await processMessage('91999', 'Ravi Sharma', step.session)
    expect(step.session?.currentStep).toBe('onboarding_city')

    step = await processMessage('91999', 'Mumbai', step.session)
    expect(step.session?.currentStep).toBe('onboarding_managerName')

    step = await processMessage('91999', 'Asha Rao', step.session)
    expect(saved).toHaveBeenCalledWith('91999', null, {
      employeeId: 'EMP-42',
      name: 'Ravi Sharma',
      city: 'Mumbai',
      managerName: 'Asha Rao',
    })
    expect(step.session?.currentStep).toBe('category_selection')
    expect(step.session?.selectedClientId).toBe('new-user-id')
    expect(step.interactive?.type).toBe('list')
  })

  it('skips onboarding when the employee profile is already complete', async () => {
    const step = await processMessage('91999', 'hi', null, undefined, [
      { id: 'u1', name: 'Ravi', employeeId: 'EMP-42', city: 'Mumbai', managerName: 'Asha' },
    ])
    expect(saved).not.toHaveBeenCalled()
    expect(step.session?.currentStep).toBe('category_selection')
    expect(step.session?.selectedClientId).toBe('u1')
  })

  it('rejects empty answers and keeps asking the same field', async () => {
    const step = await processMessage('91999', '   ', {
      currentStep: 'onboarding_city',
      stepHistory: [],
      onboarding: { employeeId: 'E1', name: 'Ravi' },
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 60000).toISOString(),
    })
    expect(step.session?.currentStep).toBe('onboarding_city')
    expect(step.message).toContain('city')
  })
})
