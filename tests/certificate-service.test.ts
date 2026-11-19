import { describe, it, expect, vi, beforeEach } from 'vitest'

// In-memory Firestore slice: where()/limit()/get(), add(), and doc().get/update().
const { db, sent } = vi.hoisted(() => {
  const stores: Record<string, Array<{ id: string; data: any }>> = {}
  let seq = 0

  function collection(name: string) {
    stores[name] ??= []
    const filters: Array<(d: any) => boolean> = []
    const query: any = {
      where(field: string, _op: string, value: unknown) {
        filters.push((d) => d[field] === value)
        return query
      },
      limit() {
        return query
      },
      async get() {
        const docs = stores[name]
          .filter((s) => filters.every((f) => f(s.data)))
          .map((s) => ({ id: s.id, data: () => s.data }))
        return { empty: docs.length === 0, docs }
      },
      async add(data: any) {
        const id = 'cert' + ++seq
        stores[name].push({ id, data })
        return { id }
      },
      doc(id: string) {
        return {
          async get() {
            const found = stores[name].find((s) => s.id === id)
            return { exists: !!found, id, data: () => found?.data }
          },
          async update(data: any) {
            const found = stores[name].find((s) => s.id === id)
            if (found) Object.assign(found.data, data)
          },
        }
      },
    }
    return query
  }

  return {
    db: {
      stores,
      collection,
      seed(collectionName: string, id: string, data: any) {
        ;(stores[collectionName] ??= []).push({ id, data })
      },
      reset() {
        for (const k of Object.keys(stores)) delete stores[k]
        seq = 0
      },
    },
    sent: { documents: [] as any[][] },
  }
})

vi.mock('#lib/firebase-admin', () => ({
  getFirestore: () => db,
  getStorage: () => ({
    bucket: () => ({
      file: () => ({
        save: async () => {},
        getSignedUrl: async () => ['https://example.com/cert.pdf?sig=1'],
      }),
    }),
  }),
}))

vi.mock('#lib/message-sender', () => ({
  sendDocument: async (...args: any[]) => {
    sent.documents.push(args)
  },
}))

import { issueCertificateIfComplete } from '#lib/certificate-service'

const PHONE = '919999000011'
const EMPLOYEE = { employeeId: 'EMP-1', name: 'Naveen', city: 'Kolkata', zone: 'East', managerName: 'Mgmt mgr' }

function seedCourse({ completeVideo = true, passed = true } = {}) {
  db.seed('learningModules', 'm1', { title: 'Video 1', videoUrl: 'https://v/1', moduleNumber: '1' })
  db.seed('assessments', 'a1', { title: 'Quiz 1', moduleId: 'm1', questionIds: ['q1'] })
  db.seed('videoDeliveries', 'd1', {
    phone: PHONE,
    moduleNumber: '1',
    status: completeVideo ? 'completed' : 'pending',
  })
  db.seed('scorecards', 's1', {
    employeeId: 'EMP-1',
    videoTitle: 'Video 1',
    result: passed ? 'PASS' : 'FAIL',
  })
}

describe('issueCertificateIfComplete', () => {
  beforeEach(() => {
    db.reset()
    sent.documents = []
  })

  it('issues the certificate and WhatsApps the PDF immediately by default', async () => {
    seedCourse()
    const issued = await issueCertificateIfComplete(PHONE, EMPLOYEE)

    expect(issued?.created).toBe(true)
    expect(issued?.certificate.certificateNumber).toBe('EDV-EMP-1')
    expect(db.stores.certificates).toHaveLength(1)
    expect(db.stores.certificates[0].data.deliveryStatus).toBe('sent')
    expect(sent.documents).toHaveLength(1)
    expect(sent.documents[0][0]).toBe(PHONE)
    expect(sent.documents[0][2]).toBe('EDV-EMP-1.pdf')
  })

  it('schedules instead of sending when a delay is configured', async () => {
    db.seed('settings', 'app', { certificateDelayMinutes: 30 })
    seedCourse()
    await issueCertificateIfComplete(PHONE, EMPLOYEE)

    expect(sent.documents).toHaveLength(0)
    expect(db.stores.certificates[0].data.deliveryStatus).toBe('scheduled')
    expect(db.stores.certificates[0].data.scheduledFor > new Date().toISOString()).toBe(true)
  })

  it('stays null while a video is incomplete or a quiz is failed', async () => {
    seedCourse({ completeVideo: false })
    expect(await issueCertificateIfComplete(PHONE, EMPLOYEE)).toBeNull()

    db.reset()
    seedCourse({ passed: false })
    expect(await issueCertificateIfComplete(PHONE, EMPLOYEE)).toBeNull()
    expect(db.stores.certificates ?? []).toHaveLength(0)
  })

  it('does not issue twice for the same employee', async () => {
    seedCourse()
    await issueCertificateIfComplete(PHONE, EMPLOYEE)
    const again = await issueCertificateIfComplete(PHONE, EMPLOYEE)

    expect(again?.created).toBe(false)
    expect(db.stores.certificates).toHaveLength(1)
  })
})
