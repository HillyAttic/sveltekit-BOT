import { browser } from '$app/env'

export interface AuthUser {
  email: string
  isAdmin: boolean
}

/**
 * Client-side admin session. Starts empty on the server, then restores from
 * localStorage on the client. The token is mirrored into a cookie so
 * hooks.server.ts can protect /admin during SSR.
 */
class AuthStore {
  user = $state<AuthUser | null>(null)
  loading = $state(true)
  token = $state<string | null>(null)

  get isAdmin() {
    return this.user?.isAdmin ?? false
  }

  constructor() {
    if (browser) this.restore()
  }

  getToken() {
    return this.token
  }

  private async restore() {
    const storedToken = localStorage.getItem('auth_token')
    if (!storedToken) {
      this.loading = false
      return
    }

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: storedToken }),
      })

      if (res.ok) {
        const data = await res.json()
        this.user = data.user
        this.token = storedToken
        document.cookie = `auth_token=${storedToken}; path=/; SameSite=Strict`
      } else {
        this.clear()
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      this.clear()
    } finally {
      this.loading = false
    }
  }

  async signIn(email: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Login failed')
    }

    const data = await res.json()
    this.user = data.user
    this.token = data.token
    localStorage.setItem('auth_token', data.token)
    document.cookie = `auth_token=${data.token}; path=/; SameSite=Strict`
  }

  signOut() {
    this.clear()
    this.user = null
    this.token = null
  }

  private clear() {
    localStorage.removeItem('auth_token')
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict'
  }
}

export const auth = new AuthStore()
