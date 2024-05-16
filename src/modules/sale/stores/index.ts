import type { ResponseV1 } from '@/utils/apis/http'
import type { PaymentMethod } from '@/utils/apis/models/commons'
import type { Payment, Sales } from '@/utils/apis/models/model'
import type { SalesForm } from '@/utils/apis/models/request/salesCreateRequest'
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

	const getSale = async (id: string): Promise<Sales> => {
    try {
      const res = await salesApi.getSale(id)
      return res.data!
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }

	const payment = async (id: string, payment: {
		payment_date: string
		payment_method: PaymentMethod
		amount: number
	}): Promise<void> => {
    try {
			await salesApi.payment(id, payment)
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }

	const deleteSale = async (id: string): Promise<void> => {
    try {
      await salesApi.deleteSale(id)
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
		getSale,
		payment,
		deleteSale,
  }
})
