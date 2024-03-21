import endpoints from "../endpoints";
import http, { type ResponseV1 } from "../http";
import type { Customer } from "../models/model";
import type { CustomerForm } from "../models/request/request";

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
  getCustomer: async (customerId: string): Promise<Customer> => {  
    try {
      const res = await http.get<ResponseV1<Customer>>('/v1' + endpoints.master.customer + '/' + customerId)
      return res.data.data!
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
  editCustomer: async (customer: Customer): Promise<void> => {  
    try {
      const res = await http.put<ResponseV1>('/v1' + endpoints.master.customer + '/' + customer.id, customer)
      return res.data.data!
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
  deleteCustomer: async (customerId: string): Promise<void> => {  
    try {
      await http.delete<ResponseV1>('/v1' + endpoints.master.customer + '/' + customerId)
    } catch (error) {
      console.log('error', error);
      throw error
    }
  },
}