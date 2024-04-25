import endpoints from "../endpoints";
import http, { type ResponseV1 } from "../http";
import type { GetProgressResponse } from "../models/response";


export default {
  importPriceList: async (file: File): Promise<any> => {  
    try {
			const bodyFormData = new FormData()
			bodyFormData.append('file', file)
      const res = await http.post<ResponseV1<any>>('/v1' + endpoints.master.import.priceList, bodyFormData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
      return res.data.data ?? []
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
	getImportPriceListProgress: async (): Promise<GetProgressResponse> => {  
    try {
      const res = await http.get<ResponseV1<GetProgressResponse>>('/v1' + endpoints.master.import.progress('import:price_stock'))
      return res.data.data!
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
	cancelImport: async (): Promise<void> => {  
    try {
      await http.post<ResponseV1<any>>('/v1' + endpoints.master.import.cancel, {
				key: "import:price_stock"
		})
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
}