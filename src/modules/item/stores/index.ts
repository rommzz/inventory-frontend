import type { BTableQuery } from '@/components/types/BTable'
import type { ResponseV1 } from '@/utils/apis/http'
import type { InventoryItem } from '@/utils/apis/models/model'
import type { InventoryItemForm } from '@/utils/apis/models/request/request'
import inventoryItemApi, { type InventoryItemFilter } from '@/utils/apis/repo/inventoryItemApi'
import { defineStore } from 'pinia'
import { toRaw } from 'vue'

export const useItemStore = defineStore('itemStore', () => {
  const getListItem = async (query?: BTableQuery, filter?: InventoryItemFilter): Promise<ResponseV1> => {
    try {
			console.log(toRaw(filter));
			
      const q: {
        limit?: number,
        offset?: number,
        search?: string 
        brand_id?: string[],
        supplier_id? : string[],
        start_date?: string
        end_date?: string
      } = {
        limit: query?.limit,
        offset: query?.offset,
        search: query?.search,
        // brand_id: filter?.brand?.map(el => el.id),
        supplier_id: filter?.supplier?.map(el => el.id!),
        start_date: filter?.startDate && `${filter?.startDate}T00:00:00Z`,
        end_date: filter?.endDate && `${filter?.endDate}T23:59:59Z`,
      }
      const res = await inventoryItemApi.getInventoryItems(q)
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
	const countInventoryItem = async (): Promise<number> => {
		return inventoryItemApi.countInventoryItem()
	}
  return {
    getListItem,
    getItem,
    addItem,
    editItem,
    deleteItem,
		countInventoryItem,
  }
})
