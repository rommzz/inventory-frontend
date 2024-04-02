import type { ItemType } from "../commons";

export type CustomerForm = {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  company_name?: string;
}

export type SupplierForm = {
  name: string
  company_name: string
  email?: string
  phone?: string
  address?: string
}

export type InventoryItemForm = {
  sku: string
	name: string
  supplier_id: string
  type: ItemType
  unit_id: string
  car_code_id: string
  valid_from: string
  initial_stock: number
  price: number
  tax_recommendation?: number
  m_group?: string
  product_hierarchy?: string
}