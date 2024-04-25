import endpoints from "../endpoints";
import http, { type ResponseV1 } from "../http";
import type { ChartModel, Unit } from "../models/model";

export default {
  getUnits: async (): Promise<Unit[]> => {  
    try {
      const res = await http.get<ResponseV1<Unit[]>>('/v1' + endpoints.master.meta.units)
      return res.data.data ?? []
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
	getTodaySales: async (): Promise<number> => {  
    try {
      const res = await http.get<ResponseV1<{count: number}>>('/v1' + endpoints.master.inventorySalesToday)	
			return res.data.data?.count ?? 0
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
	getSalesChart: async (period: string): Promise<ChartModel[]> => {  
    try {
      const res = await http.get<ResponseV1<ChartModel[]>>('/v1' + endpoints.master.salesChart, {
				params: {
					period_type: period
				}
			})	
			return res.data.data ?? []
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
}