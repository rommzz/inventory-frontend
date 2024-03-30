import type { CarCode } from '@/utils/apis/models/model'
import carApi from '@/utils/apis/repo/carApi'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCarStore = defineStore('carStore', () => {
	const carCodeList = ref<CarCode[]>([])
  const getCarCodeList = async (): Promise<CarCode[]> => {
    try {
      const res = await carApi.getCarCodeList()
			carCodeList.value = res
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  
  return {
		carCodeList,
    getCarCodeList,
  }
})
