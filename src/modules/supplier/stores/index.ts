
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('supplier', () => {
  const count = ref(0)
  return { count, }
})
