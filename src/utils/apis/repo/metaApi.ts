import endpoints from "../endpoints";
import http, { type ResponseV1 } from "../http";
import type { Unit } from "../models/model";

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
}