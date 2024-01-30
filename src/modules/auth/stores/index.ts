import router from '@/router'
import { authApi } from '@/utils/apis'

import storage from '@/utils/storage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type Auth = {
  iduser: string
  user_type: string
  nama: string
  token: string
  karyawan: any
  access_level: any
}

export const useAuthStore = defineStore('auth', () => {
  const auth = ref<Auth | null>(null)
  const login = async (email: string, password: string, isRemember: boolean) => {
    try {
      const res = await authApi.loginEmail(email, password, isRemember)
      console.log(res)
      auth.value = res
      storage.setAuth(auth.value)
      router.push('/')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  const logout = (): void => {
    auth.value = null
    storage.clearAuth()
    window.location.reload()
  }
  const getToken = computed(() => auth.value?.token)

  return { auth, login, logout, getToken }
})
