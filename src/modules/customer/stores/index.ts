import type { ResponseV1 } from '@/utils/apis/http'
import type { Customer } from '@/utils/apis/models/model'
import type { CustomerForm } from '@/utils/apis/models/request/request'
import customerApi from '@/utils/apis/repo/customerApi'
import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customerStore', () => {
  const getListCustomer = async (query?: Record<string, any>): Promise<ResponseV1<Customer[]>> => {
    try {
      const res = await customerApi.getCustomers(query)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const addCustomer = async (customer: CustomerForm): Promise<Customer> => {
    try {
      const res = await customerApi.addCustomer(customer)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const getCustomer = async (customerId: string): Promise<Customer> => {
    try {
      const res = await customerApi.getCustomer(customerId)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const editCustomer = async (customer: Customer): Promise<void> => {
    try {
      const res = await customerApi.editCustomer(customer)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const deleteCustomer = async (customerId: string): Promise<void> => {
    try {
      await customerApi.deleteCustomer(customerId)
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
	const getCountCustomer = async (): Promise<number> => {
    return customerApi.customerCount()
  }
  return {
    getListCustomer,
    addCustomer,
    getCustomer,
    editCustomer,
    deleteCustomer,
		getCountCustomer,
  }
})
