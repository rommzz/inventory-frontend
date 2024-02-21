
import { supplierApi } from '@/utils/apis'
import type { ResponseV1 } from '@/utils/apis/http'
import type { Supplier } from '@/utils/apis/models/model'
import type { AddSupplier } from '@/utils/apis/models/request'
import { defineStore } from 'pinia'

export const useSupplierStore = defineStore('supplierStore', () => {
  const getListSupplier = async (): Promise<ResponseV1> => {
    try {
      const res = await supplierApi.getSuppliers()
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const addSupplier = async (supplier: AddSupplier): Promise<Supplier> => {
    try {
      const res = await supplierApi.addSupplier(supplier)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  return {
    getListSupplier,
    addSupplier,
  }
})
