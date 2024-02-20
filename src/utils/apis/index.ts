import endpoints from './endpoints';
import http, { type ResponeseV1 } from './http';
import type { User } from './models/model';
import type { LoginResponse } from './models/response';

export const authApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const res = await http.post<ResponeseV1<LoginResponse>>('/v1' + endpoints.auth.login, {
        username,
        password,
      })
      
      return res.data.data!;
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
  logout: async (): Promise<void> => {
    try {
      await http.post<ResponeseV1>('/v1' + endpoints.auth.logout)
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
}

export const userApi = {
  getUserInformation: async (): Promise<User> => {
    try {
      const res = await http.get<ResponeseV1<User>>('/v1' + endpoints.auth.user.me)
      console.log(res.data.status);
      
      return res.data.data ?? {} as User
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
}