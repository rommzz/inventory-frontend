import { shallowRef } from "vue";
import endpoints from "../endpoints";
import http, { type ResponseV1 } from "../http";
import type { PaymentMethod, PaymentStatusList } from "../models/commons";
import type { Purchase, Sales } from "../models/model";
import type { SalesForm } from "../models/request/salesCreateRequest";
import moment from "moment";

export type SalesFilter = {
	startDate?: string
	endDate?: string
	saleStatus?: PaymentStatusList
}

export default {
  getListSales: async (query?: Record<string, any>, filter?: SalesFilter): Promise<ResponseV1<Sales[]>> => {  
    try {
      const res = await http.get<ResponseV1<Sales[]>>('/v1' + endpoints.sales.sale, {
				params: {
					...query,
					start_date: filter?.startDate,
					end_date: filter?.endDate,
					paid: filter?.saleStatus?.value
				}
			})
      return res.data
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
	getSale: async (id: string): Promise<ResponseV1<Sales>> => {  
    try {
      const res = await http.get<ResponseV1<Sales>>('/v1' + endpoints.sales.sale + `/${id}`)
      return res.data
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
	payment: async (purhcaseId: string, payment: {
		payment_date: string
		payment_method: PaymentMethod
		amount: number
	}): Promise<ResponseV1<Purchase>> => {  
    try {
      const res = await http.post<ResponseV1<Purchase>>('/v1' + endpoints.sales.payment(purhcaseId), payment)
      return res.data
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
	deleteSale: async (purhcaseId: string): Promise<void> => {  
    try {
      await http.delete<ResponseV1>('/v1' + endpoints.sales.sale + `/${purhcaseId}`)
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
	createSale: async (data: SalesForm): Promise<Sales> => {  
		const formatTime = (date: string): string => {
			return moment(date + ' ' + moment().utc().format('HH:mm:ss')).utc().format()
		}
		console.log(shallowRef(data));
    try {
      const res = await http.post<ResponseV1>('/v1' + endpoints.sales.sale, {
				customer_id: data.customer!.id,
				...(data.taxType == 'value' ? { tax: data.tax } : {tax_percent: data.tax}),
				...(data.discountType == 'value' ? { discount: data.discount } : {discount_percent: data.discount}),
				sale_date: formatTime(data.saleDate!),
				items: data.items?.map(v => {
					return {
						inventory_item_id: v.item.id,
						qty: v.qty,
						price: v.price
					}
				}),
				payments: data.payments?.map(v => {
					return {
						amount: v.amount,
						payment_date: formatTime(v.payment_date!),
						payment_method: v.payment_method,
						note: v.note,
					}
				})
		})
			return res.data.data
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
}