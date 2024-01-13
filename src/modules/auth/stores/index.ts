import storage from '@/utils/storage'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Auth = {
  name: string
  email: string
  // password: string
  token: string
  role: 'employee' | 'admin'
}

export const useAuthStore = defineStore('auth', () => {
  const auth = ref<Auth | null>(null)
  const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    auth.value = {
      name: 'John Doe',
      email,
      token: '123456789',
      role: Math.random() > 0.5 ? 'admin' : 'employee',
    }
    storage.setAuth(auth.value)
  }
  const logout = ():void => {
    auth.value = null
    storage.clearAuth()
    window.location.reload()
  }

  return { auth, login, logout }
})