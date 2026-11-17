import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { generateToken, verifyToken } from '#lib/simple-auth'

describe('simple-auth.ts', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      JWT_SECRET: 'test-secret',
      ADMIN_EMAIL: 'admin@example.com',
      ADMIN_PASSWORD: 'secret',
    }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('round-trips a valid admin token', () => {
    const token = generateToken({ email: 'admin@example.com', isAdmin: true })
    expect(verifyToken(token)).toEqual({ email: 'admin@example.com', isAdmin: true })
  })

  it('rejects a tampered token', () => {
    const token = generateToken({ email: 'admin@example.com', isAdmin: true })
    expect(verifyToken(token + 'x')).toBeNull()
  })

  it('rejects a token signed with another secret', () => {
    const token = generateToken({ email: 'admin@example.com', isAdmin: true })
    process.env.JWT_SECRET = 'other-secret'
    expect(verifyToken(token)).toBeNull()
  })
})
