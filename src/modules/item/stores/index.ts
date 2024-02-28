import type { ResponseV1 } from '@/utils/apis/http'
import type { InventoryItem } from '@/utils/apis/models/model'
import type { InventoryItemForm } from '@/utils/apis/models/request'
import inventoryItemApi from '@/utils/apis/repo/inventoryItemApi'
import { defineStore } from 'pinia'

export const useItemStore = defineStore('itemStore', () => {
  const getListItem = async (query?: Record<string, any>): Promise<ResponseV1> => {
    try {
      const res = await inventoryItemApi.getInventoryItems(query)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const getItem = async (id: string): Promise<InventoryItem> => {
    try {
      const res = await inventoryItemApi.getInventoryItem(id)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const addItem = async (data: InventoryItemForm): Promise<ResponseV1> => {
    try {
      const res = await inventoryItemApi.addInventoryItem(data)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const editItem = async (data: InventoryItemForm, id: string): Promise<ResponseV1> => {
    try {
      const res = await inventoryItemApi.editInventoryItem(data, id)
      return res
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  const deleteItem = async (id: string): Promise<void> => {
    try {
      await inventoryItemApi.deleteInventoryItem(id)
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
  return {
    getListItem,
    getItem,
    addItem,
    editItem,
    deleteItem,
  }
})
