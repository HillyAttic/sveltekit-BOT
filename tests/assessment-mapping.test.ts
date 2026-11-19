import { describe, it, expect, vi, beforeEach } from 'vitest'

const state = vi.hoisted(() => ({ docs: [] as { id: string; data: Record<string, unknown> }[] }))

vi.mock('#lib/firebase-admin', () => ({
  getFirestore: () => ({
    collection: () => ({
      get: async () => ({
        docs: state.docs.map((d) => ({ id: d.id, data: () => d.data })),
      }),
    }),
  }),
}))

import { getAssessmentForModule, type LearningModule } from '#lib/learning-service'

const video = (id: string, moduleNumber?: string): LearningModule => ({
  id,
  title: 'Video ' + id,
  videoUrl: 'https://example.com/' + id,
  moduleNumber,
})

describe('getAssessmentForModule', () => {
  beforeEach(() => {
    state.docs = [
      { id: 'a1', data: { title: 'Quiz 1', moduleId: 'v1' } },
      { id: 'a2', data: { title: 'Quiz 2', moduleId: 'v2' } },
      { id: 'a3', data: { title: 'Quiz 3' } },
    ]
  })

  it('returns the assessment mapped to that exact video', async () => {
    expect((await getAssessmentForModule(video('v2')))?.id).toBe('a2')
    expect((await getAssessmentForModule(video('v1')))?.id).toBe('a1')
  })

  it('does not fall back to another assessment by order', async () => {
    expect(await getAssessmentForModule(video('v3'))).toBeNull()
  })

  it('still honours the legacy moduleNumber link', async () => {
    state.docs = [{ id: 'a9', data: { title: 'Legacy', moduleNumber: '7' } }]
    expect((await getAssessmentForModule(video('vX', '7')))?.id).toBe('a9')
  })

  it('returns null when there is no video', async () => {
    expect(await getAssessmentForModule(null)).toBeNull()
  })
})
