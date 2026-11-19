import { describe, it, expect, vi, beforeEach } from 'vitest'

// Minimal in-memory Firestore good enough for chatSessions queries.
const { db } = vi.hoisted(() => {
  const sessions: Array<{ id: string; data: any }> = []
  let nextId = 1

  function collection(name: string) {
    if (name !== 'chatSessions') throw new Error(`unexpected collection ${name}`)
    const filters: Array<(d: any) => boolean> = []
    let order: { field: string; dir: 'asc' | 'desc' } | null = null
    let max = Infinity

    const query: any = {
      where(field: string, _op: string, value: unknown) {
        filters.push((d) => d[field] === value)
        return query
      },
      orderBy(field: string, dir: 'asc' | 'desc') {
        order = { field, dir }
        return query
      },
      limit(n: number) {
        max = n
        return query
      },
      async get() {
        let docs = sessions.filter((s) => filters.every((f) => f(s.data)))
        if (order) {
          const { field, dir } = order
          docs = [...docs].sort(
            (a, b) => (a.data[field] > b.data[field] ? 1 : -1) * (dir === 'desc' ? -1 : 1)
          )
        }
        docs = docs.slice(0, max)
        return {
          empty: docs.length === 0,
          docs: docs.map((s) => ({
            id: s.id,
            data: () => s.data,
            ref: {
              async update(patch: any) {
                Object.assign(s.data, patch)
              },
            },
          })),
        }
      },
      async add(data: any) {
        const id = `s${nextId++}`
        sessions.push({ id, data })
        return { id }
      },
    }
    return query
  }

  return {
    db: {
      sessions,
      collection,
      reset() {
        sessions.length = 0
        nextId = 1
      },
    },
  }
})

vi.mock('#lib/firebase-admin', () => ({ getFirestore: () => db }))

import { recordChatActivity } from '#lib/chat-logger'

describe('chat session boundaries', () => {
  beforeEach(() => db.reset())

  it('ignores messages that do not start with Hi', async () => {
    const id = await recordChatActivity('919999000011', {
      messages: [{ from: 'user', text: 'random' }],
    })
    expect(id).toBeNull()
    expect(db.sessions).toHaveLength(0)
  })

  it('stores the user + bot transcript of the flow started by Hi', async () => {
    const id = await recordChatActivity('919999000011', {
      startNew: true,
      messages: [
        { from: 'user', text: 'hi' },
        { from: 'bot', text: '1/4 — Employee ID:' },
      ],
    })
    await recordChatActivity('919999000011', {
      messages: [
        { from: 'user', text: 'EMP-1' },
        { from: 'bot', text: '2/4 — Employee Name:' },
      ],
    })

    expect(db.sessions).toHaveLength(1)
    expect(db.sessions[0].id).toBe(id)
    expect(db.sessions[0].data.messages.map((m: any) => [m.from, m.text])).toEqual([
      ['user', 'hi'],
      ['bot', '1/4 — Employee ID:'],
      ['user', 'EMP-1'],
      ['bot', '2/4 — Employee Name:'],
    ])
    expect(db.sessions[0].data.messageCount).toBe(2)
  })

  it('closes the old flow and starts a fresh one on the next Hi', async () => {
    await recordChatActivity('919999000011', {
      startNew: true,
      messages: [{ from: 'user', text: 'hi' }, { from: 'bot', text: 'prompt' }],
    })
    await recordChatActivity('919999000011', {
      startNew: true,
      messages: [{ from: 'user', text: 'restart' }, { from: 'bot', text: 'prompt' }],
    })

    expect(db.sessions).toHaveLength(2)
    expect(db.sessions[0].data.status).toBe('completed')
    expect(db.sessions[0].data.endedAt).toBe(db.sessions[0].data.lastMessageAt)
    expect(db.sessions[1].data.messages).toHaveLength(2)
    expect(db.sessions[1].data.messages[0].text).toBe('restart')
  })
})
