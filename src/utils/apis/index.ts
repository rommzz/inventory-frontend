import endpoints from './endpoints';
import http, { type ResponeseV1 } from './http';
import type { User } from './models/model';
import type { LoginResponse } from './models/response';

export const authApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const res = await http.post<LoginResponse>('/v1' + endpoints.auth.login, {
        username,
        password,
      })
      
      return res.data
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
}

export const userApi = {
  getUserInformation: async (): Promise<User> => {
    try {
      const res = await http.get<ResponeseV1<User>>('/v1' + endpoints.user)
      return res.data.data ?? {} as User
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
}