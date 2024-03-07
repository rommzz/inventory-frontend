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
  name: string;
  brand_id: string;
  supplier_id: string;
  sku: string;
  unit_id: string;
  price: number;
  initial_stock: number;
}