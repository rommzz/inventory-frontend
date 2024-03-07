import type { ResponseV1 } from '@/utils/apis/http'
import type { Customer, Supplier } from '@/utils/apis/models/model'
import type { CustomerForm } from '@/utils/apis/models/request'
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
  const getSupplier = async (supplierId: string): Promise<Supplier> => {
    try {
      const res = await customerApi.getSupplier(supplierId)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const editSupplier = async (supplier: Supplier): Promise<Supplier> => {
    console.log(supplier.id);
    
    try {
      const res = await customerApi.editSupplier(supplier)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const deleteSupplier = async (supplierId: string): Promise<void> => {
    try {
      await customerApi.deleteSupplier(supplierId)
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  return {
    getListCustomer,
    addCustomer,
    getSupplier,
    editSupplier,
    deleteSupplier,
  }
})
