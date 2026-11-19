import { describe, it, expect, vi, beforeEach } from 'vitest'

// In-memory Firestore slice: where() + get() + batch().delete/commit.
const { db } = vi.hoisted(() => {
  const stores: Record<string, Array<{ id: string; data: any }>> = {}

  function collection(name: string) {
    stores[name] ??= []
    const filters: Array<(d: any) => boolean> = []
    const query: any = {
      where(field: string, _op: string, value: unknown) {
        filters.push((d) => d[field] === value)
        return query
      },
      async get() {
        return {
          docs: stores[name]
            .filter((s) => filters.every((f) => f(s.data)))
            .map((s) => ({ id: s.id, data: () => s.data, ref: { collection: name, id: s.id } })),
        }
      },
    }
    return query
  }

  let pending: Array<{ collection: string; id: string }> = []
  const batch = {
    delete(ref: { collection: string; id: string }) {
      pending.push(ref)
    },
    async commit() {
      for (const d of pending) {
        const arr = stores[d.collection]
        stores[d.collection] = arr.filter((s) => s.id !== d.id)
      }
      pending = []
    },
  }

  return {
    db: {
      stores,
      collection,
      batch: () => batch,
      seed(collection: string, id: string, data: any) {
        ;(stores[collection] ??= []).push({ id, data })
      },
      reset() {
        for (const k of Object.keys(stores)) delete stores[k]
        pending = []
      },
    },
  }
})

vi.mock('#lib/firebase-admin', () => ({ getFirestore: () => db }))

import { resetEmployeeProgress } from '#lib/learning-service'

const PHONE = '919999000011'
const EMP = 'EMP-1'

describe('resetEmployeeProgress', () => {
  beforeEach(() => db.reset())

  it('deletes videos, reminders, submissions and scorecards for that employee only', async () => {
    db.seed('videoDeliveries', 'd1', { phone: PHONE, status: 'pending' })
    db.seed('videoDeliveries', 'd2', { phone: PHONE, status: 'completed' })
    db.seed('videoDeliveries', 'd3', { phone: '918888888888', status: 'pending' })
    db.seed('scheduledReminders', 'r1', { phone: PHONE, deliveryId: 'd1' })
    db.seed('scheduledReminders', 'r2', { phone: '918888888888', deliveryId: 'd3' })
    db.seed('assessmentSubmissions', 'a1', { employeeId: EMP })
    db.seed('assessmentSubmissions', 'a2', { employeeId: 'EMP-OTHER' })
    db.seed('scorecards', 's1', { employeeId: EMP })
    db.seed('scorecards', 's2', { employeeId: 'EMP-OTHER' })
    db.seed('certificates', 'c1', { employeeId: EMP })
    db.seed('certificates', 'c2', { employeeId: 'EMP-OTHER' })

    await resetEmployeeProgress(PHONE, EMP)

    expect(db.stores.videoDeliveries.map((d) => d.id)).toEqual(['d3'])
    expect(db.stores.scheduledReminders.map((d) => d.id)).toEqual(['r2'])
    expect(db.stores.assessmentSubmissions.map((d) => d.id)).toEqual(['a2'])
    expect(db.stores.scorecards.map((d) => d.id)).toEqual(['s2'])
    expect(db.stores.certificates.map((d) => d.id)).toEqual(['c2'])
  })

  it('skips result collections when the employee id is unknown', async () => {
    db.seed('videoDeliveries', 'd1', { phone: PHONE })
    db.seed('scorecards', 's1', { employeeId: EMP })

    await resetEmployeeProgress(PHONE)

    expect(db.stores.videoDeliveries).toHaveLength(0)
    expect(db.stores.scorecards).toHaveLength(1)
  })
})
