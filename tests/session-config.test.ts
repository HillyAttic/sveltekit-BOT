import { describe, it, expect, vi, beforeEach } from 'vitest'

const state = vi.hoisted(() => ({ minutes: 30 as unknown }))

vi.mock('#lib/firebase-admin', () => ({
  getFirestore: () => ({
    collection: () => ({
      doc: () => ({
        get: async () => ({ exists: true, data: () => ({ sessionTimeoutMinutes: state.minutes }) }),
      }),
    }),
  }),
}))

async function load() {
  return (await import('#lib/session-config')).getSessionTimeoutMs
}

describe('getSessionTimeoutMs', () => {
  beforeEach(() => vi.resetModules())

  it('uses the minutes configured in admin settings', async () => {
    state.minutes = 45
    expect(await (await load())()).toBe(45 * 60_000)
  })

  it('falls back to 30 minutes when missing or invalid', async () => {
    state.minutes = 'nonsense'
    expect(await (await load())()).toBe(30 * 60_000)
  })

  it('clamps to 1–1440 minutes', async () => {
    state.minutes = 5000
    expect(await (await load())()).toBe(1440 * 60_000)

    vi.resetModules()
    state.minutes = 0
    expect(await (await load())()).toBe(60_000)
  })
})
