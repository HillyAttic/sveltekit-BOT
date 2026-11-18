import { json } from '@sveltejs/kit'
import { waitUntil } from 'cloudflare:workers'
import type { RequestEvent } from './$types'
import { validateSignature } from '#lib/validate-signature'
import {
  parseWebhookPayload,
  sanitizeMessageBody,
  findAllUsersByPhone,
  getBotSession,
  saveBotSession,
} from '#lib/document-service'
import { normalizePhone } from '#lib/phone'
import {
  sendMessage,
  sendDocument,
  sendInteractiveButtons,
  sendInteractiveList,
  sleep,
} from '#lib/message-sender'
import { processMessage } from '#lib/bot-flow'
import { recordChatActivity, closeChatSession } from '#lib/chat-logger'

// WhatsApp retries webhooks when a 200 is slow — keep a short dedup window.
const processedMessages = new Map<string, number>()
const DEDUP_TTL_MS = 5 * 60 * 1000

function isDuplicate(messageId: string): boolean {
  const now = Date.now()
  for (const [id, timestamp] of processedMessages) {
    if (now - timestamp > DEDUP_TTL_MS) processedMessages.delete(id)
  }

  if (processedMessages.has(messageId)) return true

  processedMessages.set(messageId, now)
  return false
}

export async function GET({ url }: RequestEvent) {
  const mode = url.searchParams.get('hub.mode')
  const token = url.searchParams.get('hub.verify_token')
  const challenge = url.searchParams.get('hub.challenge')
  const verifyToken = process.env.WEBHOOK_VERIFY_TOKEN

  if (!verifyToken) {
    console.error('WEBHOOK_VERIFY_TOKEN environment variable is missing')
    return json({ error: 'Server configuration error' }, { status: 500 })
  }

  if (mode === 'subscribe' && token === verifyToken && challenge) {
    return new Response(challenge, { status: 200 })
  }

  return json({ error: 'Forbidden' }, { status: 403 })
}

export async function POST(event: RequestEvent) {
  try {
    const rawBody = await event.request.text()
    const signature = event.request.headers.get('x-hub-signature-256')
    const appSecret = process.env.APP_SECRET
    console.log(`Webhook POST: ${rawBody.length} bytes, signature=${signature ? 'yes' : 'no'}`)

    if (!appSecret) {
      console.error('APP_SECRET environment variable is missing')
      return json({ error: 'Server configuration error' }, { status: 500 })
    }

    if (!signature) {
      return json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!validateSignature(rawBody, signature, appSecret)) {
      return json({ error: 'Unauthorized' }, { status: 401 })
    }

    const parsed = parseWebhookPayload(JSON.parse(rawBody))

    if (!parsed) {
      console.log('Webhook: no message in payload (status/other event)')
      return json({ status: 'ok' }, { status: 200 })
    }

    console.log(`Webhook message ${parsed.messageId} from ${parsed.from}`)

    if (isDuplicate(parsed.messageId)) {
      console.log(`Skipping duplicate message: ${parsed.messageId}`)
      return json({ status: 'ok' }, { status: 200 })
    }

    // Return 200 immediately and keep the request alive while the bot replies.
    // adapter-cloudflare v8 no longer sets event.platform, so pull waitUntil
    // from the Workers runtime module (stubbed as a no-op in dev).
    waitUntil(handleMessage(parsed))

    return json({ status: 'ok' }, { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return json({ status: 'ok' }, { status: 200 })
  }
}

async function handleMessage(parsed: {
  from: string
  text: string
  messageId: string
  interactiveReplyId?: string
}) {
  try {
    const { from, text, interactiveReplyId } = parsed
    const normalizedPhone = normalizePhone(from)
    const sanitizedText = sanitizeMessageBody(text)

    const users = await findAllUsersByPhone(normalizedPhone)
    console.log(`Users found for ${normalizedPhone}: ${users.length}`)

    // Unknown numbers are not rejected: saying Hi starts the onboarding flow,
    // which creates their employee record after collecting the four details.
    const session = await getBotSession(normalizedPhone)
    const availableClients = users.map((u) => ({
      id: u.id,
      name: u.name,
      employeeId: u.employeeId,
      city: u.city,
      managerName: u.managerName,
    }))
    const result = await processMessage(
      normalizedPhone,
      sanitizedText,
      session,
      interactiveReplyId,
      availableClients
    )

    if (result.session) {
      await saveBotSession(normalizedPhone, result.session)
    }

    const isGreeting =
      sanitizedText.toLowerCase().trim() === 'hi' || sanitizedText.toLowerCase().trim() === 'hello'
    const isRestart = ['0', 'main_menu', 'select_category'].includes(
      (interactiveReplyId || sanitizedText).toLowerCase().trim()
    )

    if (isGreeting) {
      await closeChatSession(normalizedPhone)
      await recordChatActivity(normalizedPhone, {
        clientId: users[0]?.id,
        clientName: users[0]?.name,
      })
    } else if (isRestart && result.session) {
      await closeChatSession(normalizedPhone)
      await recordChatActivity(normalizedPhone, {
        clientId: result.session.selectedClientId || users[0]?.id,
        clientName: result.session.selectedClientName || users[0]?.name,
      })
    } else {
      await recordChatActivity(normalizedPhone, {
        clientId: result.session?.selectedClientId,
        clientName: result.session?.selectedClientName,
      })
    }

    if (result.interactive) {
      if (result.interactive.type === 'button') {
        await sendInteractiveButtons(from, result.interactive.body, result.interactive.buttons)
      } else if (result.interactive.type === 'list') {
        await sendInteractiveList(
          from,
          result.interactive.body,
          result.interactive.buttonText,
          result.interactive.sections
        )
      }
    } else if (result.documents && result.documents.length > 0) {
      for (let i = 0; i < result.documents.length; i++) {
        if (i > 0) await sleep(1000)
        const doc = result.documents[i]
        await sendDocument(from, doc.url, doc.filename, doc.caption)
      }
    } else if (result.document) {
      await sendDocument(from, result.document.url, result.document.filename, result.document.caption)
    } else if (result.message) {
      await sendMessage(from, result.message)
    }

    if (result.followUp) {
      await sleep(1500)
      if (result.followUp.type === 'button') {
        await sendInteractiveButtons(from, result.followUp.body, result.followUp.buttons)
      } else if (result.followUp.type === 'list') {
        await sendInteractiveList(
          from,
          result.followUp.body,
          result.followUp.buttonText,
          result.followUp.sections
        )
      }
    }
  } catch (error) {
    console.error('Error processing message:', error)
    try {
      await sendMessage(parsed.from, 'Something went wrong. Please try again by sending "Hi".')
    } catch (sendError) {
      console.error('Failed to send error fallback message:', sendError)
    }
  }
}
