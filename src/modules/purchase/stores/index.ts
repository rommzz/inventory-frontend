import type { ResponseV1 } from '@/utils/apis/http'
import type { PaymentMethod } from '@/utils/apis/models/commons'
import type { Payment, Purchase } from '@/utils/apis/models/model'
import type { PurchaseForm } from '@/utils/apis/models/request/purchaseAddRequest'
import purchaseApi from '@/utils/apis/repo/purchaseApi'
import moment from 'moment'
import { defineStore } from 'pinia'

export type PaymentStatus = 'Lunas' | 'Belum Lunas' | 'Belum Dibayar'

export const usePurchaseStore = defineStore('purchaseStore', () => {
	const paymentStatus = (payment: Payment[]): PaymentStatus  => {
		if (payment.length == 0) {
			return 'Belum Dibayar'
		} 
		if (payment[0].remaining_payment === 0) {
			return 'Lunas'
		} else {
			return 'Belum Lunas'
		}
	}

	const remeaningPayment = (payment: Payment[], grandTotal: number): number => {
		if (!payment.length) {
			return grandTotal
		} else {
			return payment[payment.length - 1].remaining_payment
		}
	} 

  const getListPurchase = async (query?: Record<string, any>): Promise<ResponseV1<Purchase[]>> => {
    try {
      const res = await purchaseApi.getPurchases(query)
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
	
	const cratePurchase = async (data: PurchaseForm): Promise<void> => {	
    try {
      await purchaseApi.createPurchase({
				grand_total: data.grand_total,
				items: data.items!.map(v => ({
					inventory_item_id: v.item.id,
					qty: v.qty,
					price: v.price,
				})),
				...(data.taxType == 'value' ? { tax: data.tax } : {tax_percent: data.tax}),
				...(data.discountType == 'value' ? { discount: data.discount } : {discount_percent: data.discount}),
				purchase_date: moment(data.purchase_date! ).utc().format(),
				supplier_id: data.supplier?.id!,
				payments: data.payments?.map(v => {
					return {
						payment_date: moment(v.payment_date!).utc().format(),
						payment_method: v.payment_method!,
						amount: v.amount!,
						note: v.note,
					}
				})
			})
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  
  return {
		paymentStatus,
    getListPurchase,
		cratePurchase,
		getPurchase,
		payment,
		deletePurchase,
		remeaningPayment,
  }
})
