import { getFirestore } from './firebase-admin'
import { sendMessage } from './message-sender'
import { normalizePhone } from './phone'

export interface ReminderStep {
  id: string
  triggerMinutes: number
  message: string
  enabled: boolean
  order: number
}

export interface ReminderConfig {
  enabled: boolean
  maxReminders: number
  reminders: ReminderStep[]
  updatedAt: string
}

export interface VideoDelivery {
  id?: string
  phone: string
  clientId?: string
  clientName?: string
  employeeName?: string
  videoTitle: string
  videoUrl?: string
  moduleNumber?: string
  deliveredAt: string
  completedAt?: string | null
  status: 'pending' | 'completed'
}

export interface ScheduledReminder {
  id?: string
  deliveryId: string
  phone: string
  employeeName?: string
  videoTitle: string
  videoUrl?: string
  moduleNumber?: string
  message?: string
  reminderNumber: number
  scheduledAt: string
  sentAt?: string | null
  status: 'scheduled' | 'sent' | 'delivered' | 'failed' | 'cancelled' | 'completed'
  error?: string
}

export interface ReminderHistoryRow {
  employeeName: string
  employeeId: string
  videoTitle: string
  videoDeliveryTime: string
  scheduledReminderTime: string
  actualReminderSentTime: string
  reminderNumber: number
  deliveryStatus: string
  completionStatus: string
  nextScheduledReminder: string
}

const DEFAULT_REMINDERS: ReminderStep[] = [
  { id: 'r1', triggerMinutes: 20, message: 'Hi {name}! We noticed you haven\'t confirmed completion of {video} (Module {module}). Please watch and type FINISH once completed.', enabled: true, order: 1 },
  { id: 'r2', triggerMinutes: 60, message: 'Friendly reminder {name}! Your learning video {video} is still pending. Complete it to unlock your assessment.', enabled: true, order: 2 },
  { id: 'r3', triggerMinutes: 240, message: 'Hi {name}, your Edventure learning video {video} is still incomplete. Type FINISH after watching to continue.', enabled: true, order: 3 },
  { id: 'r4', triggerMinutes: 360, message: 'Reminder: {video} (Module {module}) is pending. Please complete and type FINISH.', enabled: true, order: 4 },
  { id: 'r5', triggerMinutes: 1440, message: 'Final reminder {name}: your Edventure learning activity {video} is still incomplete. Complete it to continue your journey.', enabled: true, order: 5 },
]

// Reminder config is read on every video delivery; cache it briefly so the
// reply doesn't wait on a config read.
const CONFIG_TTL_MS = 60_000
let configCache: { config: ReminderConfig; at: number } | null = null

export function invalidateReminderConfig(): void {
  configCache = null
}

export async function getReminderConfig(): Promise<ReminderConfig> {
  if (configCache && Date.now() - configCache.at < CONFIG_TTL_MS) return configCache.config

  const db = getFirestore()
  const doc = await db.collection('config').doc('reminders').get()
  let config: ReminderConfig
  if (!doc.exists) {
    config = { enabled: true, maxReminders: 5, reminders: DEFAULT_REMINDERS, updatedAt: new Date().toISOString() }
    await db.collection('config').doc('reminders').set(config)
  } else {
    config = doc.data() as ReminderConfig
    if (!config.reminders || config.reminders.length === 0) config.reminders = DEFAULT_REMINDERS
  }
  configCache = { config, at: Date.now() }
  return config
}

export async function saveReminderConfig(config: ReminderConfig): Promise<void> {
  const db = getFirestore()
  config.updatedAt = new Date().toISOString()
  await db.collection('config').doc('reminders').set(config)
  invalidateReminderConfig()
}

function renderMessage(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`)
}

export async function recordVideoDelivery(delivery: Omit<VideoDelivery, 'id' | 'status' | 'completedAt'>): Promise<string> {
  const db = getFirestore()
  const payload: VideoDelivery = {
    ...delivery,
    phone: normalizePhone(delivery.phone),
    status: 'pending',
    completedAt: null,
    deliveredAt: delivery.deliveredAt || new Date().toISOString(),
  }
  const ref = await db.collection('videoDeliveries').add(payload)
  // schedule reminders
  await scheduleReminders(ref.id, payload, payload.deliveredAt)
  return ref.id
}

export async function scheduleReminders(deliveryId: string, delivery: VideoDelivery, deliveredAt: string): Promise<void> {
  const cfg = await getReminderConfig()
  if (!cfg.enabled) return
  const db = getFirestore()
  const base = new Date(deliveredAt).getTime()
  const steps = cfg.reminders.filter(r => r.enabled).sort((a, b) => a.order - b.order).slice(0, cfg.maxReminders)
  // One round trip instead of one per reminder (this runs before the bot reply).
  await Promise.all(
    steps.map((step, i) => {
      const scheduledAt = new Date(base + step.triggerMinutes * 60 * 1000).toISOString()
      const sr: ScheduledReminder = {
        deliveryId,
        phone: delivery.phone,
        employeeName: delivery.employeeName || delivery.clientName,
        videoTitle: delivery.videoTitle,
        videoUrl: delivery.videoUrl,
        moduleNumber: delivery.moduleNumber,
        message: step.message,
        reminderNumber: i + 1,
        scheduledAt,
        sentAt: null,
        status: 'scheduled',
      }
      return db.collection('scheduledReminders').add(sr)
    })
  )
}

export async function cancelReminders(deliveryId: string): Promise<void> {
  const db = getFirestore()
  const snap = await db.collection('scheduledReminders').where('deliveryId', '==', deliveryId).get()
  const batch = db.batch()
  for (const d of snap.docs) {
    const data = d.data() as ScheduledReminder
    if (data.status === 'scheduled') {
      batch.update(d.ref, { status: 'cancelled' })
    }
  }
  await batch.commit()
}

export async function markDeliveryComplete(deliveryId: string): Promise<void> {
  const db = getFirestore()
  await Promise.all([
    db.collection('videoDeliveries').doc(deliveryId).update({ status: 'completed', completedAt: new Date().toISOString() }),
    cancelReminders(deliveryId),
  ])
}

export async function getPendingDelivery(phone: string): Promise<(VideoDelivery & { id: string }) | null> {
  const db = getFirestore()
  // Single-field query + in-memory filter avoids requiring a composite index.
  const snap = await db.collection('videoDeliveries').where('phone', '==', normalizePhone(phone)).get()
  const pending = snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as VideoDelivery) }))
    .filter((d) => d.status === 'pending')
    .sort((a, b) => (a.deliveredAt < b.deliveredAt ? 1 : -1))
  return pending[0] ?? null
}

export async function processDueReminders(): Promise<{ processed: number; sent: number; failed: number; cancelled: number }> {
  const db = getFirestore()
  const now = new Date().toISOString()
  const snap = await db.collection('scheduledReminders').where('status', '==', 'scheduled').get()
  const due = snap.docs.filter(d => (d.data() as ScheduledReminder).scheduledAt <= now)
  // After a cron outage every missed reminder is due at once. Only the newest per
  // delivery is still worth sending; the rest would be a burst of identical nags.
  const latestByDelivery = new Map<string, (typeof due)[number]>()
  for (const d of due) {
    const sr = d.data() as ScheduledReminder
    const current = latestByDelivery.get(sr.deliveryId)
    if (!current || (current.data() as ScheduledReminder).scheduledAt < sr.scheduledAt) {
      latestByDelivery.set(sr.deliveryId, d)
    }
  }
  let processed = 0, sent = 0, failed = 0, cancelled = 0
  const cfg = await getReminderConfig()
  for (const d of due) {
    processed++
    const sr = d.data() as ScheduledReminder
    if (latestByDelivery.get(sr.deliveryId) !== d) {
      await d.ref.update({ status: 'cancelled' })
      cancelled++
      continue
    }
    // check completion
    const deliverySnap = await db.collection('videoDeliveries').doc(sr.deliveryId).get()
    const delivery = deliverySnap.exists ? (deliverySnap.data() as VideoDelivery) : null
    if (delivery?.status === 'completed') {
      await d.ref.update({ status: 'cancelled' })
      cancelled++
      continue
    }
    if (!cfg.enabled) {
      await d.ref.update({ status: 'cancelled' })
      cancelled++
      continue
    }
    // Snapshot the message when scheduled so config edits only affect future reminders.
    const template = sr.message || cfg.reminders[sr.reminderNumber - 1]?.message
    let message = renderMessage(template || 'Reminder: please complete your learning video and type FINISH.', {
      name: sr.employeeName || 'there',
      video: sr.videoTitle,
      module: sr.moduleNumber || '',
      reminderNumber: String(sr.reminderNumber),
    })
    if (sr.videoUrl) message += '\n\nWatch here: ' + sr.videoUrl
    try {
      // ponytail: plain text only; outside WhatsApp's 24h window this needs an
      // approved template message. Add a template lookup here when that matters.
      await sendMessage(sr.phone, message)
      await d.ref.update({ status: 'sent', sentAt: new Date().toISOString() })
      // log history
      await db.collection('reminderHistory').add({
        employeeName: sr.employeeName || '',
        employeeId: sr.phone,
        videoTitle: sr.videoTitle,
        videoDeliveryTime: delivery?.deliveredAt || '',
        scheduledReminderTime: sr.scheduledAt,
        actualReminderSentTime: new Date().toISOString(),
        reminderNumber: sr.reminderNumber,
        deliveryStatus: 'Sent',
        completionStatus: delivery?.status || 'pending',
        nextScheduledReminder: '',
      })
      sent++
    } catch (e) {
      await d.ref.update({ status: 'failed', error: e instanceof Error ? e.message : String(e) })
      failed++
    }
  }
  return { processed, sent, failed, cancelled }
}

export async function getReminderHistory(): Promise<ReminderHistoryRow[]> {
  const db = getFirestore()
  // scheduledReminders holds every reminder (scheduled/sent/failed/cancelled), so the
  // tracking table shows upcoming and cancelled reminders too, not just sent ones.
  const [reminders, deliveries] = await Promise.all([
    db.collection('scheduledReminders').orderBy('scheduledAt', 'desc').limit(500).get(),
    db.collection('videoDeliveries').get(),
  ])

  const deliveryById = new Map<string, VideoDelivery>()
  for (const d of deliveries.docs) deliveryById.set(d.id, d.data() as VideoDelivery)

  const statusLabel: Record<string, string> = {
    scheduled: 'Scheduled',
    sent: 'Sent',
    delivered: 'Delivered',
    failed: 'Failed',
    cancelled: 'Cancelled',
    completed: 'Completed',
  }

  const grouped = new Map<string, ScheduledReminder[]>()
  for (const d of reminders.docs) {
    const sr = d.data() as ScheduledReminder
    if (!grouped.has(sr.deliveryId)) grouped.set(sr.deliveryId, [])
    grouped.get(sr.deliveryId)!.push(sr)
  }

  return reminders.docs.map((d) => {
    const sr = d.data() as ScheduledReminder
    const delivery = deliveryById.get(sr.deliveryId)
    const next = (grouped.get(sr.deliveryId) || [])
      .filter((r) => r.reminderNumber > sr.reminderNumber && r.status === 'scheduled')
      .sort((a, b) => a.reminderNumber - b.reminderNumber)[0]
    return {
      employeeName: sr.employeeName || delivery?.clientName || '',
      employeeId: sr.phone,
      videoTitle: sr.videoTitle,
      videoDeliveryTime: delivery?.deliveredAt || '',
      scheduledReminderTime: sr.scheduledAt,
      actualReminderSentTime: sr.sentAt || '',
      reminderNumber: sr.reminderNumber,
      deliveryStatus: statusLabel[sr.status] || sr.status,
      completionStatus: delivery?.status === 'completed' ? 'Completed' : 'Pending',
      nextScheduledReminder: next?.scheduledAt || '',
    }
  })
}
