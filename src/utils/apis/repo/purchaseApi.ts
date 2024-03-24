import { shallowRef } from "vue";
import endpoints from "../endpoints";
import http, { type ResponseV1 } from "../http";
import type { Purchase } from "../models/model";

export default {
  getPurchases: async (query?: Record<string, any>): Promise<ResponseV1<Purchase[]>> => {  
    try {
      const res = await http.get<ResponseV1<Purchase[]>>('/v1' + endpoints.purchase.purchase, {
				params: query
			})
      return res.data
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
	createPurchase: async (data: {
		purchase_date: string;
		total?: number,
		grand_total?: number,
		tax?: number;
		tax_percent?: number,
		discount?: number;
		discount_percent?: number;
		supplier_id: string;
		items: {
			inventory_item_id: string;
			qty: number;
			price: number;
		}[];
		payments?: {
			payment_date: string;
			payment_method: string;
			amount: number;
			note?: string;
		}[];
	}): Promise<ResponseV1> => {  
		console.log(shallowRef(data));
    try {
      const res = await http.post<ResponseV1>('/v1' + endpoints.purchase.purchase, data)
			return res.data;
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
}