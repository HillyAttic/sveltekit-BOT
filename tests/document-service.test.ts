import { describe, it, expect, vi } from 'vitest'
import * as fc from 'fast-check'

vi.mock('#lib/firebase-admin', () => ({
  getFirestore: vi.fn(),
}))

import { parseWebhookPayload, sanitizeMessageBody } from '#lib/document-service'

describe('document-service.ts', () => {
  it('extracts from and text from a valid payload', () => {
    fc.assert(
      fc.property(
        fc.string().filter((s) => s.length > 0),
        fc.string().filter((s) => s.length > 0),
        (from, text) => {
          const payload = {
            entry: [
              {
                changes: [
                  { value: { messages: [{ id: 'm1', type: 'text', from, text: { body: text } }] } },
                ],
              },
            ],
          }

          const result = parseWebhookPayload(payload)
          expect(result).not.toBeNull()
          expect(result?.from).toBe(from)
          expect(result?.text).toBe(text)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('handles interactive button and list replies', () => {
    const base = (interactive: unknown) => ({
      entry: [{ changes: [{ value: { messages: [{ id: 'm1', from: '123', type: 'interactive', interactive }] } }] }],
    })

    expect(
      parseWebhookPayload(
        base({ type: 'button_reply', button_reply: { id: 'btn', title: 'Tap' } })
      )
    ).toMatchObject({ from: '123', text: 'Tap', interactiveReplyId: 'btn' })

    expect(
      parseWebhookPayload(
        base({ type: 'list_reply', list_reply: { id: 'row', title: 'Row' } })
      )
    ).toMatchObject({ from: '123', text: 'Row', interactiveReplyId: 'row' })
  })

  it('returns null for malformed or empty payloads', () => {
    expect(parseWebhookPayload(null)).toBeNull()
    expect(parseWebhookPayload(undefined)).toBeNull()
    expect(parseWebhookPayload({})).toBeNull()
    expect(parseWebhookPayload({ entry: [] })).toBeNull()
    expect(
      parseWebhookPayload({ entry: [{ changes: [{ value: { messages: [] } }] }] })
    ).toBeNull()
    expect(
      parseWebhookPayload({
        entry: [{ changes: [{ value: { messages: [{ from: '123' }] } }] }],
      })
    ).toBeNull()
  })

  it('trims message bodies', () => {
    expect(sanitizeMessageBody('')).toBe('')
    expect(sanitizeMessageBody('  hello  ')).toBe('hello')
  })
})
