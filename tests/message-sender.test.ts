import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { sendMessage } from '#lib/message-sender'

describe('message-sender.ts', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv }
    process.env.WHATSAPP_TOKEN = 'test-token'
    process.env.PHONE_NUMBER_ID = 'test-phone-id'
    global.fetch = vi.fn()
  })

  afterEach(() => {
    process.env = originalEnv
    vi.restoreAllMocks()
  })

  it('throws when WHATSAPP_TOKEN is missing', async () => {
    delete process.env.WHATSAPP_TOKEN
    await expect(sendMessage('1234567890', 'test')).rejects.toThrow(
      'WHATSAPP_TOKEN environment variable is required'
    )
  })

  it('throws when PHONE_NUMBER_ID is missing', async () => {
    delete process.env.PHONE_NUMBER_ID
    await expect(sendMessage('1234567890', 'test')).rejects.toThrow(
      'PHONE_NUMBER_ID environment variable is required'
    )
  })

  it('sends a text message with the expected payload', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true, status: 200 })
    global.fetch = mockFetch

    await sendMessage('1234567890', 'Hello, World!')

    expect(mockFetch).toHaveBeenCalledWith(
      'https://graph.facebook.com/v22.0/test-phone-id/messages',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer test-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: '1234567890',
          type: 'text',
          text: { body: 'Hello, World!' },
        }),
      }
    )
  })

  it('throws on non-2xx responses without retrying 4xx', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      text: async () => 'Bad Request',
    })
    global.fetch = mockFetch

    await expect(sendMessage('1234567890', 'test')).rejects.toThrow(
      'WhatsApp API returned status 400'
    )
    expect(mockFetch).toHaveBeenCalledTimes(1)
  })
})
