import endpoints from './endpoints';
import http from './http';
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
      console.log('error coy', error);
      throw error
    }
  }
}
