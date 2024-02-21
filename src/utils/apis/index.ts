import endpoints from './endpoints';
import http, { type ResponseV1 } from './http';
import type { Supplier, Unit, User } from './models/model';
import type { AddSupplier } from './models/request';
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
  }
}

export const supplierApi = {
  addSupplier: async (supplier: AddSupplier): Promise<Supplier> => {  
    try {
      const res = await http.post<ResponseV1<Supplier>>('/v1' + endpoints.master.supplier, supplier)
      console.log(res);
      
      return res.data.data!
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
  getSuppliers: async (): Promise<ResponseV1> => {  
    try {
      const res = await http.get<ResponseV1<Supplier[]>>('/v1' + endpoints.master.supplier)
      return res.data
    } catch (error) {
      console.log('error', error);
      throw error
    }
  }
}
