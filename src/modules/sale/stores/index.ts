import type { ResponseV1 } from '@/utils/apis/http'
import type { PaymentMethod } from '@/utils/apis/models/commons'
import type { Payment, Purchase, Sales } from '@/utils/apis/models/model'
import type { SalesForm } from '@/utils/apis/models/request/salesCreateRequest'
import purchaseApi from '@/utils/apis/repo/purchaseApi'
import salesApi, { type SalesFilter } from '@/utils/apis/repo/salesApi'
import { defineStore } from 'pinia'

export type PaymentStatus = 'Lunas' | 'Belum Lunas' | 'Belum Dibayar'

export const useSaleStore = defineStore('saleStore', () => {
	const paymentStatus = (payment: Payment[]): PaymentStatus  => {
		if (payment.length == 0) {
			return 'Belum Dibayar'
		} 
		if (payment[payment.length - 1].remaining_payment === 0) {
			return 'Lunas'
		} else {
			return 'Belum Lunas'
		}
	}

  const getListSales = async (query?: Record<string, any>, filter?: SalesFilter): Promise<ResponseV1<Sales[]>> => {
    try {
			console.log(filter);
      const res = await salesApi.getListSales(query, filter)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }

	const getPurchase = async (id: string): Promise<ResponseV1<Purchase>> => {
    try {
      const res = await purchaseApi.getPurchase(id)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }

	const payment = async (id: string, payment: {
		payment_date: string
		payment_method: PaymentMethod
		amount: number
	}): Promise<ResponseV1<Purchase>> => {
    try {
      const res = await purchaseApi.payment(id, payment)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }

	const deletePurchase = async (id: string): Promise<void> => {
    try {
      await purchaseApi.deletePurchase(id)
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
	
	const createSale = async (data: SalesForm): Promise<Sales> => {	
    try {
      const res = await salesApi.createSale(data)
			return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  
  return {
		paymentStatus,
    getListSales,
		createSale,
		getPurchase,
		payment,
		deletePurchase,
  }
})
