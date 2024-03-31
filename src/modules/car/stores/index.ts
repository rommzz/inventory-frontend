import type { CarCode, CarGroupType, CarType } from '@/utils/apis/models/model'
import carApi from '@/utils/apis/repo/carApi'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCarStore = defineStore('carStore', () => {
	const carCodeList = ref<CarCode[]>([])
	const carTypeGroupList = ref<CarGroupType[]>([])
	const carTypeList = ref<CarType[]>([])

  const getCarCodeList = async (carType?: string): Promise<CarCode[]> => {
    try {
      const res = await carApi.getCarCodeList(carType)
			carCodeList.value = res
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }

	const getCarTypeGroupList = async (search?: string): Promise<CarGroupType[]> => {
    try {
      const res = await carApi.getCarTypeGroupList(search)
			carTypeGroupList.value = res
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }

	const getCarTypeList = async (groupTypeId?: string): Promise<CarType[]> => {
    try {
      const res = await carApi.getCarTypeList(groupTypeId)
			carTypeList.value = res
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  
  return {
		carCodeList,
		carTypeGroupList,
		carTypeList,
    getCarCodeList,
		getCarTypeGroupList,
		getCarTypeList,
  }
})
