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
  company?: string;
  email?: string;
  phone?: string;
  logo?: string;
  address?: string; // Full address
} & TimeStamp

export type InventoryItem = {
  id?: string;
  readid?: string;
  name?: string;
  unitid?: string;
  merkid?: string;
  supplierid?: string;
  sku?: string;
  purchase_price?: number;
  inventory_price?: number;
  initial_quantity?: number;
} & TimeStamp