import type { ResponseV1 } from '@/utils/apis/http'
import type { User } from '@/utils/apis/models/model'
import type { UserForm } from '@/utils/apis/models/request/request'
import userApi, { type UserListParams } from '@/utils/apis/repo/userApi'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const createUser = async (user: UserForm): Promise<User> => {
    return await userApi.createUser(user)
  }

	const getUserDetail = async (userId: string): Promise<User> => {
    return await userApi.getUserDetail(userId)
  }

	const getUsers = async (params?: UserListParams): Promise<ResponseV1<User[]>> => {
    return await userApi.getUsers(params)
  }

	const updateUser = async (user: UserForm, id: string): Promise<void> => {
    return await userApi.updateUser(user, id)
  }

	const deleteUser = async (id: string): Promise<void> => {
    return await userApi.deleteUser(id)
  }

	const accountUpdate = async (username: string, password: string, id: string): Promise<void> => {
		return await userApi.accountUpdate(username, password, id)
	}
  
  return {
    createUser,
		getUserDetail,
		getUsers,
		updateUser,
		deleteUser,
		accountUpdate,
  }
})
