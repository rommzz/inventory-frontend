import type { Auth } from '@/modules/auth/stores'

const KEY = {
  AUTH: 'auth'
}

const storage = {
  getAuth(): Auth | null {
    const auth = localStorage.getItem(KEY.AUTH)
    if (auth) {
      return JSON.parse(auth)
    }
    return null
  },
  setAuth(auth: Auth): void {
    localStorage.setItem(KEY.AUTH, JSON.stringify(auth))
  },
  clearAuth(): void {
    localStorage.removeItem(KEY.AUTH)
  }
}

export default storage
