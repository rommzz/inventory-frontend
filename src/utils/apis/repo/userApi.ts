import endpoints from "../endpoints";
import type { ResponseV1 } from "../http";
import http from "../http";
import type { User } from "../models/model";
import type { UserForm } from "../models/request/request";

export type UserListParams = {
	limit?: number
	offset?: number
	search?: string
}

export default {
  getUserInformation: async (): Promise<User> => {
    try {
      const res = await http.get<ResponseV1<User>>('/v1' + endpoints.auth.user.me)
      return res.data.data ?? {} as User
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },

	createUser: async (user: UserForm): Promise<User> => {
    try {
      const res = await http.post<ResponseV1<User>>('/v1' + endpoints.auth.user.index, user)
      return res.data.data ?? {} as User
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },

	updateUser: async (user: UserForm, id: string): Promise<void> => {
    try {
      await http.patch<ResponseV1<User>>('/v1' + endpoints.auth.user.userById(id), user)
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },

	deleteUser: async (id: string): Promise<void> => {
    try {
      await http.delete('/v1' + endpoints.auth.user.userById(id))
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },

	getUserDetail: async (id: string): Promise<User> => {
    try {
      const res = await http.get<ResponseV1<User>>('/v1' + endpoints.auth.user.userById(id))
      return res.data.data ?? {} as User
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },

	getUsers: async (params?: UserListParams): Promise<ResponseV1<User[]>> => {
    try {
      const res = await http.get<ResponseV1<User[]>>('/v1' + endpoints.auth.user.index, {
				params: params
			})
      return res.data
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },

	accountUpdate: async (username: string, password: string, id: string): Promise<void> => {
    try {
      await http.patch<ResponseV1<User[]>>('/v1' + endpoints.auth.user.userById(id), {
				username: username,
				password: password,
			})
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
}
