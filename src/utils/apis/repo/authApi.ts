import endpoints from "../endpoints";
import http, { type ResponseV1 } from "../http";
import type { LoginResponse } from "../models/response";

export default {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const res = await http.post<ResponseV1<LoginResponse>>('/v1' + endpoints.auth.login, {
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
      await http.post<ResponseV1>('/v1' + endpoints.auth.logout)
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
}