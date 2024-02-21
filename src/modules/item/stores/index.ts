
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useItemStore = defineStore('itemStore', () => {
  const count = ref(0)
  return { count, }
})
