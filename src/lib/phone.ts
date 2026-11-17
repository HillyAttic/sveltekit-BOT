/**
 * Normalizes a phone number by stripping all non-numeric characters.
 */
export function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, '')
}
