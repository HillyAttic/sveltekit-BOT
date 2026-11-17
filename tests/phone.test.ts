import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { normalizePhone } from '#lib/phone'

describe('phone.ts', () => {
  it('normalizePhone returns only digits in original order', () => {
    fc.assert(
      fc.property(fc.string(), (raw) => {
        const result = normalizePhone(raw)
        expect(result).toMatch(/^\d*$/)
        expect(result).toBe(raw.replace(/\D/g, ''))
      }),
      { numRuns: 100 }
    )
  })

  it('strips common phone formatting characters', () => {
    expect(normalizePhone('')).toBe('')
    expect(normalizePhone('abc-def')).toBe('')
    expect(normalizePhone('+1 (555) 123-4567')).toBe('15551234567')
    expect(normalizePhone('+91 98765 43210')).toBe('919876543210')
  })
})
