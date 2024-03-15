import type { PaymentMethod } from "../commons";
import type { InventoryItem, Supplier } from "../model";

export type PurchaseItem = {
  item: InventoryItem,
  qty: number,
  price: number
}

export type Payment = {
  payment_date?: string;
  payment_method?: PaymentMethod;
  amount?: number;
  note?: string;
}

export type PurchaseForm = {
  purchase_date?: string;
  total?: number;
  tax?: number;
  discount?: number;
  supplier?: Supplier;
  items?: PurchaseItem[];
  payments?: Payment[];
}