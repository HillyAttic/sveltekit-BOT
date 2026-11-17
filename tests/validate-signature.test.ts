import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { createHmac } from 'crypto'
import { validateSignature } from '#lib/validate-signature'

describe('validate-signature.ts', () => {
  it('accepts valid HMAC-SHA256 signatures and rejects invalid ones', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.string().filter((s) => s.length > 0),
        fc.string(),
        (body, secret, randomString) => {
          const validSignature =
            'sha256=' + createHmac('sha256', secret).update(body).digest('hex')

          expect(validateSignature(body, validSignature, secret)).toBe(true)

          const invalidSignature = 'sha256=' + randomString
          if (invalidSignature !== validSignature) {
            expect(validateSignature(body, invalidSignature, secret)).toBe(false)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  it('rejects missing prefix, empty signature, wrong secret and modified body', () => {
    const secret = 'test-secret-key'
    const body = '{"test": "data"}'
    const signature = 'sha256=' + createHmac('sha256', secret).update(body).digest('hex')

    expect(validateSignature(body, signature, secret)).toBe(true)
    expect(validateSignature(body, signature.slice(7), secret)).toBe(false)
    expect(validateSignature(body, '', secret)).toBe(false)
    expect(validateSignature(body + 'modified', signature, secret)).toBe(false)
    expect(validateSignature(body, signature, 'wrong-secret')).toBe(false)
  })
})
