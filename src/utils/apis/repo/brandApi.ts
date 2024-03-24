import endpoints from "../endpoints";
import http, { type ResponseV1 } from "../http";
import type { Brand } from "../models/model";

export default {
  getBrands: async (): Promise<Brand[]> => {  
    try {
      const res = await http.get<ResponseV1<Brand[]>>('/v1' + endpoints.master.brand)
      return res.data.data ?? []
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
  addBrand: async (brandName: string): Promise<void> => {  
    try {
      await http.post<ResponseV1>('/v1' + endpoints.master.brand, {
        name: brandName
      })
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
}