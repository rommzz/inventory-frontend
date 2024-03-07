import endpoints from "../endpoints";
import http, { type ResponseV1 } from "../http";
import type { Customer, Supplier } from "../models/model";
import type { CustomerForm } from "../models/request";

export default {
  addCustomer: async (customer: CustomerForm): Promise<Customer> => {  
    try {
      const res = await http.post<ResponseV1<Customer>>('/v1' + endpoints.master.customer, customer)
      return res.data.data!
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
  getCustomers: async (query?: Record<string, any>): Promise<ResponseV1> => {  
    try {
      const res = await http.get<ResponseV1<Customer[]>>('/v1' + endpoints.master.customer, {
        params: query
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