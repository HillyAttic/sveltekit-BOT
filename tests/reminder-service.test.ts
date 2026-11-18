import { describe, it, expect, vi, beforeEach } from 'vitest'

const state = {
  config: null as any,
  added: [] as Array<{ collection: string; data: any }>,
}

vi.mock('#lib/firebase-admin', () => ({
  getFirestore: () => ({
    collection: (name: string) => ({
      doc: (_id: string) => ({
        get: async () => ({ exists: !!state.config, data: () => state.config }),
        set: async (data: any) => { if (name === 'config') state.config = data },
        update: async () => {},
      }),
      add: async (data: any) => {
        state.added.push({ collection: name, data })
        return { id: 'id-' + state.added.length }
      },
      where: () => ({
        get: async () => ({ docs: [] }),
      }),
    }),
    batch: () => ({ update: () => {}, commit: async () => {} }),
  }),
}))

vi.mock('#lib/message-sender', () => ({ sendMessage: vi.fn(async () => {}) }))

import { getReminderConfig, scheduleReminders } from '#lib/reminder-service'

describe('reminder-service', () => {
  beforeEach(() => {
    state.config = null
    state.added = []
  })

  it('creates the default reminder configuration when none exists', async () => {
    const cfg = await getReminderConfig()
    expect(cfg.enabled).toBe(true)
    expect(cfg.reminders.length).toBe(5)
    expect(cfg.reminders.map((r) => r.triggerMinutes)).toEqual([20, 60, 240, 360, 1440])
  })

  it('schedules one reminder per enabled step, offset from delivery time', async () => {
    await getReminderConfig() // seed config
    const deliveredAt = '2026-01-01T00:00:00.000Z'
    await scheduleReminders('d1', { phone: '91999', videoTitle: 'Intro', deliveredAt, status: 'pending' }, deliveredAt)

    const scheduled = state.added.filter((a) => a.collection === 'scheduledReminders')
    expect(scheduled.length).toBe(5)
    expect(scheduled[0].data.scheduledAt).toBe('2026-01-01T00:20:00.000Z')
    expect(scheduled[4].data.scheduledAt).toBe('2026-01-02T00:00:00.000Z')
    expect(scheduled.every((s) => s.data.deliveryId === 'd1')).toBe(true)
  })

  it('skips scheduling when reminders are disabled', async () => {
    state.config = { enabled: false, maxReminders: 5, reminders: [{ id: 'r1', triggerMinutes: 20, message: 'x', enabled: true, order: 1 }] }
    await scheduleReminders('d1', { phone: '91999', videoTitle: 'Intro', deliveredAt: '2026-01-01T00:00:00.000Z', status: 'pending' }, '2026-01-01T00:00:00.000Z')
    expect(state.added.filter((a) => a.collection === 'scheduledReminders').length).toBe(0)
  })
})
