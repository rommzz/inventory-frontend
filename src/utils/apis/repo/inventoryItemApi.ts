import endpoints from "../endpoints";
import type { ResponseV1 } from "../http";
import http from "../http";
import type { Brand, InventoryItem, Supplier } from "../models/model";
import type { InventoryItemForm } from "../models/request/request";

export type InventoryItemFilter = {
  startDate?: string,
  endDate?: string,
  brand?: Brand[],
  supplier?: Supplier[]
}

export default {
  getInventoryItems: async (query?: Record<string, any>): Promise<ResponseV1> => {
    try {
      const res = await http.get<ResponseV1<InventoryItem[]>>('/v1' + endpoints.master.inventoryItem, {
        params: query,
      })
      return res.data ?? []
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
  getInventoryItem: async (id: string): Promise<InventoryItem> => {
    try {
      const res = await http.get<ResponseV1<InventoryItem>>('/v1' + endpoints.master.inventoryItem + `/${id}`);
      return res.data.data!
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
  addInventoryItem: async (data: InventoryItemForm): Promise<ResponseV1> => {
    try {
      const res = await http.post<ResponseV1<InventoryItem[]>>('/v1' + endpoints.master.inventoryItem, data)
      return res.data ?? {}
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
  editInventoryItem: async (data: InventoryItemForm, id: string): Promise<ResponseV1> => {
    try {
      const res = await http.patch<ResponseV1<InventoryItem[]>>('/v1' + endpoints.master.inventoryItem + `/${id}`, data)
      return res.data ?? {}
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
  deleteInventoryItem: async (id: string): Promise<void> => {
    try {
      await http.delete<ResponseV1<InventoryItem>>('/v1' + endpoints.master.inventoryItem + `/${id}`);
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
}