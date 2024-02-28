import endpoints from './endpoints';
import http, { type ResponseV1 } from './http';
import type { Brand, InventoryItem, Supplier, Unit, User } from './models/model';
import type { InventoryItemForm, supplierForm } from './models/request';
import type { LoginResponse } from './models/response';

export const authApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const res = await http.post<ResponseV1<LoginResponse>>('/v1' + endpoints.auth.login, {
        username,
        password,
      })
      
      return res.data.data!;
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
  logout: async (): Promise<void> => {
    try {
      await http.post<ResponseV1>('/v1' + endpoints.auth.logout)
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
}

export const userApi = {
  getUserInformation: async (): Promise<User> => {
    try {
      const res = await http.get<ResponseV1<User>>('/v1' + endpoints.auth.user.me)
      return res.data.data ?? {} as User
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
}

export const metaApi = {
  getUnits: async (): Promise<Unit[]> => {  
    try {
      const res = await http.get<ResponseV1<Unit[]>>('/v1' + endpoints.master.meta.units)
      return res.data.data ?? []
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
}

export const supplierApi = {
  addSupplier: async (supplier: supplierForm): Promise<Supplier> => {  
    try {
      const res = await http.post<ResponseV1<Supplier>>('/v1' + endpoints.master.supplier, supplier)
      console.log(res);
      
      return res.data.data!
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
  getSuppliers: async (query?: Record<string, any>): Promise<ResponseV1> => {  
    try {
      const res = await http.get<ResponseV1<Supplier[]>>('/v1' + endpoints.master.supplier, {
        // params: query
      })
      return res.data
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
  getSupplier: async (supplierId: string): Promise<Supplier> => {  
    try {
      const res = await http.get<ResponseV1<Supplier>>('/v1' + endpoints.master.supplier + '/' + supplierId)
      return res.data.data!
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
  editSupplier: async (supplier: Supplier): Promise<Supplier> => {  
    try {
      const res = await http.patch<ResponseV1<Supplier>>('/v1' + endpoints.master.supplier + '/' + supplier.id, supplier)
      return res.data.data!
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
  deleteSupplier: async (supplierId: string): Promise<void> => {  
    try {
      await http.delete<ResponseV1<Supplier>>('/v1' + endpoints.master.supplier + '/' + supplierId)
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
}

export const inventoryItemApi = {
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

export const brandApi = {
  getBrands: async (): Promise<Brand[]> => {  
    try {
      const res = await http.get<ResponseV1<Brand[]>>('/v1' + endpoints.master.brand)
      return res.data.data ?? []
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
}
