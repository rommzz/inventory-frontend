import endpoints from "../endpoints";
import type { ResponseV1 } from "../http";
import http from "../http";
import type { User } from "../models/model";

export default {
  getUserInformation: async (): Promise<User> => {
    try {
      const res = await http.get<ResponseV1<User>>('/v1' + endpoints.auth.user.me)
      return res.data.data ?? {} as User
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
}