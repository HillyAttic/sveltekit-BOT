import { getFirestore } from './firebase-admin'

export const DEFAULT_SESSION_TIMEOUT_MINUTES = 30
const MIN_MINUTES = 1
const MAX_MINUTES = 24 * 60
const CACHE_TTL_MS = 60_000

let cached: { ms: number; at: number } | null = null

function clampMinutes(value: unknown): number {
  const n = Number(value)
  if (!Number.isFinite(n)) return DEFAULT_SESSION_TIMEOUT_MINUTES
  return Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, Math.round(n)))
}

/**
 * Inactivity timeout for a bot session, set in Admin → Settings
 * (`settings/app.sessionTimeoutMinutes`). Cached for a minute so each message
 * doesn't re-read config. Falls back to 30 minutes.
 */
export async function getSessionTimeoutMs(): Promise<number> {
  const fallback = cached?.ms ?? DEFAULT_SESSION_TIMEOUT_MINUTES * 60_000
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.ms

  try {
    const doc = await getFirestore().collection('settings').doc('app').get()
    const minutes = clampMinutes(doc.exists ? doc.data().sessionTimeoutMinutes : undefined)
    cached = { ms: minutes * 60_000, at: Date.now() }
  } catch (error) {
    console.error('[session-config] read failed, using default:', error)
    cached = { ms: fallback, at: Date.now() }
  }
  return cached.ms
}
