import type { CarCode, CarGroupType, CarType } from '@/utils/apis/models/model'
import carApi, { type CarTypeParam } from '@/utils/apis/repo/carApi'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useCarStore = defineStore('carStore', () => {
	const loading = reactive<{
		carCodeList: boolean
		carTypeGroupList: boolean
		carTypeList: boolean
	}>({
		carCodeList: false,
		carTypeGroupList: false,
		carTypeList: false,
	})


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

	const getCarTypeList = async (param?: CarTypeParam): Promise<CarType[]> => {
		loading.carTypeList = true
    try {
      const res = await carApi.getCarTypeList(param)
			carTypeList.value = res
			loading.carTypeList = false
      return res
    } catch (error) {
      console.log('error', error);
			loading.carTypeList = false
      throw error
    }
  }
  
  return {
		loading,
		carCodeList,
		carTypeGroupList,
		carTypeList,
    getCarCodeList,
		getCarTypeGroupList,
		getCarTypeList,
  }
})
