import type { ResponseV1 } from '@/utils/apis/http'
import type { Supplier } from '@/utils/apis/models/model'
import type { SupplierForm } from '@/utils/apis/models/request/request'
import supplierApi from '@/utils/apis/repo/supplierApi'
import { defineStore } from 'pinia'

export const usePurchaseStore = defineStore('purchaseStore', () => {
  const getListPurchase = async (query?: Record<string, any>): Promise<ResponseV1<Supplier[]>> => {
    try {
      const res = await supplierApi.getSuppliers(query)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const addPurchase = async (supplier: SupplierForm): Promise<Supplier> => {
    try {
      const res = await supplierApi.addSupplier(supplier)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const getPurchase = async (supplierId: string): Promise<Supplier> => {
    try {
      const res = await supplierApi.getSupplier(supplierId)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const editPurchase = async (supplier: Supplier): Promise<Supplier> => {
    console.log(supplier.id);
    
    try {
      const res = await supplierApi.editSupplier(supplier)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const deletePurchase = async (supplierId: string): Promise<void> => {
    try {
      await supplierApi.deleteSupplier(supplierId)
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  return {
    getListPurchase,
    addPurchase,
    getPurchase,
    editPurchase,
    deletePurchase,
  }
})
