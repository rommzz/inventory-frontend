

const KEY = {
  AUTH: 'auth',
  TOKEN: 'token',
  REFRESH_TOKEN: 'refresh_token'
}

const storage = {
  setToken(token: string): void {
    localStorage.setItem(KEY.TOKEN, token)
  },
  getToken(): string | null {
    return localStorage.getItem(KEY.TOKEN)
  },
  setRefreshToken(token: string): void {
    localStorage.setItem(KEY.REFRESH_TOKEN, token)
  },
  getRefreshToken(): string | null {
    return localStorage.getItem(KEY.REFRESH_TOKEN)
  },
  clearAllTokens(): void {
    localStorage.removeItem(KEY.TOKEN)
    localStorage.removeItem(KEY.REFRESH_TOKEN)
  }
}

export default storage
