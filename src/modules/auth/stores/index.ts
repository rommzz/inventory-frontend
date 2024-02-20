import router from '@/router'
import { authApi, userApi } from '@/utils/apis'
import type { User } from '@/utils/apis/models/model'

import storage from '@/utils/storage'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAuthStore = defineStore('auth', () => {
  const auth = ref<User | null>(null)
  const clearAuth = () => {
    auth.value = null
    storage.clearAllTokens()
    window.location.reload()
  }
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
  const logout = async () => {
    try {
      await authApi.logout()
      clearAuth()
      return true
    } catch (error) {
      console.log(error);
      throw error
    }

  }
  const getUserInformation = async (): Promise<void> => {
    if (auth.value !== null) {
      return
    }
    try {
      const res = await userApi.getUserInformation()
      auth.value = res
      
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return { auth, login, logout, getUserInformation, clearAuth }
})
