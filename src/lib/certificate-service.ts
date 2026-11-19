import { getFirestore, getStorage } from './firebase-admin'
import { buildCertificatePdf } from './certificate-pdf'
import { getActiveModules, moduleKey, type Assessment, type EmployeeDetails } from './learning-service'
import { sendDocument } from './message-sender'
import { normalizePhone } from './phone'

export interface Certificate {
  id?: string
  certificateNumber: string
  employeeId: string
  employeeName: string
  phone?: string
  course: string
  issuedAt: string
  /** WhatsApp delivery state, driven by Admin → Settings (delay in minutes). */
  deliveryStatus?: 'scheduled' | 'sent' | 'failed'
  scheduledFor?: string
  sentAt?: string
  pdfPath?: string
  error?: string
}

const COURSE = 'Edventure Learning Program'
const MAX_DELAY_MINUTES = 24 * 60

/** Minutes to wait after issuing before sending the PDF (0 = right away). */
export async function getCertificateDelayMinutes(): Promise<number> {
  try {
    const doc = await getFirestore().collection('settings').doc('app').get()
    const raw = doc.exists ? doc.data().certificateDelayMinutes : undefined
    const value = Number(raw)
    if (!Number.isFinite(value)) return 0
    return Math.min(MAX_DELAY_MINUTES, Math.max(0, Math.round(value)))
  } catch (error) {
    console.error('[certificates] delay setting read failed, sending immediately:', error)
    return 0
  }
}

/**
 * A certificate is due once every active module's video is completed and every
 * mapped assessment has been passed (retakes count, the best attempt wins).
 */
async function evaluate(employeeId: string, phone: string): Promise<string[]> {
  const db = getFirestore()
  const normalized = normalizePhone(phone)
  const [modules, assessmentsSnap, deliveriesSnap, cardsSnap] = await Promise.all([
    getActiveModules(),
    db.collection('assessments').get(),
    db.collection('videoDeliveries').where('phone', '==', normalized).get(),
    db.collection('scorecards').where('employeeId', '==', employeeId).get(),
  ])

  const assessments: Assessment[] = assessmentsSnap.docs.map((d) => ({
    ...(d.data() as Omit<Assessment, 'id'>),
    id: d.id,
  }))
  const completed = new Set(
    deliveriesSnap.docs
      .filter((d) => d.data().status === 'completed')
      .map((d) => String(d.data().moduleNumber ?? d.data().videoTitle))
  )
  const passedVideos = new Set(
    cardsSnap.docs
      .filter((d) => d.data().result === 'PASS')
      .map((d) => String(d.data().videoTitle ?? ''))
  )

  const missing: string[] = []
  for (const m of modules) {
    if (!completed.has(moduleKey(m))) { missing.push(`${m.title}: video not completed`); continue }
    const assessment =
      assessments.find((a) => a.moduleId === m.id) ??
      (m.moduleNumber
        ? assessments.find((a) => String(a.moduleNumber ?? '') === String(m.moduleNumber))
        : undefined)
    if (assessment && !passedVideos.has(m.title)) {
      missing.push(`${m.title}: ${assessment.title} not passed`)
    }
  }
  return missing
}

/**
 * Issue the certificate when the employee has finished every module and passed
 * every mapped assessment. Returns the certificate (created: false if it was
 * already issued), or null when they are not eligible yet.
 */
export async function issueCertificateIfComplete(
  phone: string,
  employee: EmployeeDetails
): Promise<{ certificate: Certificate; created: boolean } | null> {
  const db = getFirestore()
  const employeeId = employee.employeeId
  if (!employeeId) return null

  const existing = await db
    .collection('certificates')
    .where('employeeId', '==', employeeId)
    .limit(1)
    .get()
  if (!existing.empty) {
    const doc = existing.docs[0]
    return { certificate: { ...(doc.data() as Certificate), id: doc.id }, created: false }
  }

  const missing = await evaluate(employeeId, phone)
  if (missing.length > 0) return null

  const certificate: Omit<Certificate, 'id'> = {
    certificateNumber: `EDV-${employeeId}`,
    employeeId,
    employeeName: employee.name,
    phone: normalizePhone(phone),
    course: COURSE,
    issuedAt: new Date().toISOString(),
  }
  const ref = await db.collection('certificates').add(certificate)
  const issued = { ...certificate, id: ref.id }
  await scheduleCertificateDelivery(issued)
  return { certificate: issued, created: true }
}

/**
 * Queue the certificate for WhatsApp. With a 0-minute delay it is sent from
 * here; otherwise the cron endpoint picks it up once `scheduledFor` passes.
 */
export async function scheduleCertificateDelivery(certificate: Certificate): Promise<void> {
  if (!certificate.id || !certificate.phone) return

  try {
    const db = getFirestore()
    const delay = await getCertificateDelayMinutes()
    const scheduledFor = new Date(Date.now() + delay * 60_000).toISOString()
    await db
      .collection('certificates')
      .doc(certificate.id)
      .update({ deliveryStatus: 'scheduled', scheduledFor })

    const queued = { ...certificate, deliveryStatus: 'scheduled' as const, scheduledFor }
    if (delay === 0) await deliverCertificate(queued)
  } catch (error) {
    console.error('[certificates] scheduling failed:', error)
  }
}

/** Render the PDF, upload it and send it as a WhatsApp document. */
export async function deliverCertificate(certificate: Certificate): Promise<boolean> {
  if (!certificate.id || !certificate.phone) return false
  const db = getFirestore()

  try {
    const pdf = buildCertificatePdf({
      employeeName: certificate.employeeName,
      course: certificate.course,
      certificateNumber: certificate.certificateNumber,
      issuedAt: certificate.issuedAt,
    })
    const path = `certificates/${certificate.certificateNumber}.pdf`
    const file = getStorage().bucket().file(path)
    await file.save(pdf, { contentType: 'application/pdf' })

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 23 * 60 * 60 * 1000,
    })
    await sendDocument(
      certificate.phone,
      url,
      `${certificate.certificateNumber}.pdf`,
      `Congratulations ${certificate.employeeName}! Your Edventure certificate is attached.`
    )

    await db
      .collection('certificates')
      .doc(certificate.id)
      .update({ deliveryStatus: 'sent', sentAt: new Date().toISOString(), pdfPath: path })
    return true
  } catch (error) {
    console.error('[certificates] delivery failed:', error)
    try {
      await db
        .collection('certificates')
        .doc(certificate.id)
        .update({
          deliveryStatus: 'failed',
          error: error instanceof Error ? error.message : String(error),
        })
    } catch {
      // ignore — the failure is already logged
    }
    return false
  }
}

/** Cron hook: send every certificate whose scheduled time has passed. */
export async function processDueCertificates(): Promise<{ sent: number; failed: number }> {
  const db = getFirestore()
  const now = new Date().toISOString()
  const snap = await db.collection('certificates').where('deliveryStatus', '==', 'scheduled').get()

  let sent = 0
  let failed = 0
  for (const doc of snap.docs) {
    const certificate = { ...(doc.data() as Certificate), id: doc.id }
    if ((certificate.scheduledFor ?? '') > now) continue
    if (await deliverCertificate(certificate)) sent++
    else failed++
  }
  return { sent, failed }
}

/** Backfill: issue certificates for every registered employee who now qualifies. */
export async function generateMissingCertificates(): Promise<{ created: number; skipped: number }> {
  const db = getFirestore()
  const usersSnap = await db.collection('users').get()

  let created = 0
  let skipped = 0
  for (const doc of usersSnap.docs) {
    const user = doc.data()
    const employeeId = String(user.employeeId ?? '')
    const phone = (user.phones?.[0] ?? user.phone ?? '') as string
    if (!employeeId || !phone || !user.name) { skipped++; continue }

    try {
      const issued = await issueCertificateIfComplete(phone, {
        employeeId,
        name: String(user.name),
        city: String(user.city ?? ''),
        zone: String(user.zone ?? ''),
        managerName: String(user.managerName ?? ''),
      })
      if (issued?.created) created++
      else skipped++
    } catch (error) {
      console.error('[certificates] issue failed for', employeeId, error)
      skipped++
    }
  }
  return { created, skipped }
}
