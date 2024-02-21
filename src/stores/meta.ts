import { metaApi } from '@/utils/apis'
import type { Unit } from '@/utils/apis/models/model'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMetaStore = defineStore('meta', () => {
  const units = ref<Unit[]>([])
  const getListUnits = async () => {
    try {
      const res = await metaApi.getUnits()
      units.value = res
    } catch (error) { 
      console.log(error)
      throw error
    }
  }
  return { units, getListUnits}
})
