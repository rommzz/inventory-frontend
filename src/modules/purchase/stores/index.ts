import type { ResponseV1 } from '@/utils/apis/http'
import type { Purchase } from '@/utils/apis/models/model'
import type { PurchaseForm } from '@/utils/apis/models/request/purchaseAddRequest'
import purchaseApi from '@/utils/apis/repo/purchaseApi'
import moment from 'moment'
import { defineStore } from 'pinia'

export const usePurchaseStore = defineStore('purchaseStore', () => {
  const getListPurchase = async (query?: Record<string, any>): Promise<ResponseV1<Purchase[]>> => {
    try {
      const res = await purchaseApi.getPurchases(query)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
	
	const cratePurchase = async (data: PurchaseForm): Promise<void> => {	
    try {
      await purchaseApi.createPurchase({
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
    getListPurchase,
		cratePurchase,
  }
})
