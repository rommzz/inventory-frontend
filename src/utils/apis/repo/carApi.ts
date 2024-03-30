import endpoints from "../endpoints";
import http, { type ResponseV1 } from "../http";
import type { CarCode, CarGroupType, CarType } from "../models/model";

const carTypeGroup = {
	getCarTypeGroupList: async (): Promise<CarGroupType[]> => {  
    try {
      const res = await http.get<ResponseV1<CarGroupType[]>>('/v1' + endpoints.master.car.code)
      return res.data.data ?? []
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
}

const carType = {
	getCarTypeList: async (): Promise<CarType[]> => {  
    try {
      const res = await http.get<ResponseV1<CarType[]>>('/v1' + endpoints.master.car.code)
      return res.data.data ?? []
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
}

const carCode = {
	getCarCodeList: async (): Promise<CarCode[]> => {  
    try {
      const res = await http.get<ResponseV1<CarCode[]>>('/v1' + endpoints.master.car.code)
      return res.data.data ?? []
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
}

export default {
	...carTypeGroup,
	...carType,
  ...carCode,
}