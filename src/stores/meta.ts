import type { Brand, Unit } from '@/utils/apis/models/model'
import brandApi from '@/utils/apis/repo/brandApi'
import metaApi from '@/utils/apis/repo/metaApi'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMetaStore = defineStore('meta', () => {
  const units = ref<Unit[]>([])
  const brand = ref<Brand[]>([])
  const getListUnits = async () => {
    try {
      const res = await metaApi.getUnits()
      units.value = res
    } catch (error) { 
      console.log(error)
      throw error
    }
  }
  const getListBrand = async () => {
    try {
      const res = await brandApi.getBrands()
      brand.value = res
    } catch (error) { 
      console.log(error)
      throw error
    }
  }
  return { units, brand, getListUnits, getListBrand}
})
