import router from '@/router'
import { authApi } from '@/utils/apis'
import type { User } from '@/utils/apis/models/model'

import storage from '@/utils/storage'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAuthStore = defineStore('auth', () => {
  const auth = ref<User | null>(null)
  const login = async (username: string, password: string,) => {
    try {
      const res = await authApi.login(username, password)
      console.log(res);
      auth.value = res.user
      
      storage.setToken(res.token)
      storage.setRefreshToken(res.refresh_token)
      router.push('/')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  const logout = (): void => {
    auth.value = null
    storage.clearAllTokens()
    window.location.reload()
  }

  return { auth, login, logout }
})
