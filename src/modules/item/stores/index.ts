
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSupplierStore = defineStore('supplierStore', () => {
  const count = ref(0)
  return { count, }
})
