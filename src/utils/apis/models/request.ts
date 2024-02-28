export type supplierForm = {
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