import type { TimeStamp } from "./commons"

export type User = {
  id: string
  name?: string
  email?: string
  phone?: string
  role_id?: string
  password?: string
  username?: string
} & TimeStamp

export type Supplier = {
  id?: string;
  readid?: string;
  name?: string;
  company_name?: string;
  email?: string;
  phone?: string;
  logo?: string;
  address?: string; // Full address
} & TimeStamp

export type InventoryItemStock = {
  inventory_itemid: string;
  stock: number;
  price: number;
  price_before: number;
  updated_at: Date;
  created_at: Date;
}

export type InventoryItem = {
  id: string
  name: string
  brand_id: string
  supplier_id: string
  sku: string
  price: number
  initial_stock: number
  stock: InventoryItemStock
  supplier: Supplier
  brand: Brand
  unit: Unit
} & TimeStamp

export type Brand = {
  id?: string;
  name: string;
} & TimeStamp

export type Unit = {
  id: string;
  name: string;
  description: string;
} & TimeStamp

export type Customer = {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  company_name?: string;
  email?: string
} & TimeStamp

export type Payment = {
  id: string;
  item_purchase_id: string;
  payment_date: string;
  payment_type: string;
  payment_method: string;
  amount: number;
  remaining_payment: number;
  note: string;
} & TimeStamp

export type InventoryPurchaseItem = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: any
  item_purchase_id: string
  inventory_item_id: string
  qty: number
  price_before: number
  price: number
  total: number
  inventory_item: any
}

export type Purchase = {
  id: string;
  total: number;
  tax?: number;
	tax_percent?: number;
  discount?: number;
	discount_percent?: number;
  grand_total: number;
  paid?: number;
  purchase_date: string;
  supplier_id: string;
  supplier: Supplier;
  items: InventoryPurchaseItem[];
  payments?: Payment[];
} & TimeStamp