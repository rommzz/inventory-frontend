import type { Auth } from '@/modules/auth/stores'
import endpoints from './endpoints'
import http, { type ResponeseV1 } from './http'

export const authApi = {
  loginEmail: async (email: string, password: string, isRemember: boolean): Promise<Auth> => {
    try {
      const res = await http.post<ResponeseV1<Auth>>(endpoints.auth.loginEmail, {
        email,
        password,
        isRemember
      })
      return res.data.data
    } catch (error) {
      throw new Error(error as string)
    }
  }
}
