import { describe, it, expect, vi, beforeEach } from 'vitest'

const state = vi.hoisted(() => ({
  modules: [] as Array<{ id: string; data: Record<string, unknown> }>,
  gets: 0,
}))

vi.mock('#lib/firebase-admin', () => ({
  getFirestore: () => ({
    collection: () => ({
      get: async () => {
        state.gets++
        return { docs: state.modules.map((m) => ({ id: m.id, data: () => m.data })) }
      },
    }),
  }),
}))

import { clearLearningCache, getActiveModules } from '#lib/learning-service'

describe('learning config cache', () => {
  beforeEach(() => {
    clearLearningCache()
    state.gets = 0
    state.modules = [{ id: 'm1', data: { title: 'Intro', moduleNumber: '1' } }]
  })

  it('serves repeat reads from memory instead of refetching', async () => {
    await getActiveModules()
    await getActiveModules()
    expect(state.gets).toBe(1)
  })

  it('shares one read between concurrent calls', async () => {
    await Promise.all([getActiveModules(), getActiveModules()])
    expect(state.gets).toBe(1)
  })

  it('picks up admin edits after the cache is cleared', async () => {
    await getActiveModules()
    state.modules = [{ id: 'm2', data: { title: 'New', moduleNumber: '2' } }]
    clearLearningCache()
    expect((await getActiveModules()).map((m) => m.id)).toEqual(['m2'])
    expect(state.gets).toBe(2)
  })
})
