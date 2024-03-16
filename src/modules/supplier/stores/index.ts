import type { ResponseV1 } from '@/utils/apis/http'
import type { Supplier } from '@/utils/apis/models/model'
import type { SupplierForm } from '@/utils/apis/models/request/request'

import supplierApi from '@/utils/apis/repo/supplierApi'
import { defineStore } from 'pinia'

export const useSupplierStore = defineStore('supplierStore', () => {
  const getListSupplier = async (query?: Record<string, any>): Promise<ResponseV1<Supplier[]>> => {
    try {
      const res = await supplierApi.getSuppliers(query)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const addSupplier = async (supplier: SupplierForm): Promise<Supplier> => {
    try {
      const res = await supplierApi.addSupplier(supplier)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const getSupplier = async (supplierId: string): Promise<Supplier> => {
    try {
      const res = await supplierApi.getSupplier(supplierId)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const editSupplier = async (supplier: Supplier): Promise<Supplier> => {
    console.log(supplier.id);
    
    try {
      const res = await supplierApi.editSupplier(supplier)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const deleteSupplier = async (supplierId: string): Promise<void> => {
    try {
      await supplierApi.deleteSupplier(supplierId)
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  return {
    getListSupplier,
    addSupplier,
    getSupplier,
    editSupplier,
    deleteSupplier,
  }
})
