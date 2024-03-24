import type { DiscountType, PaymentMethod } from "../commons";
import type { InventoryItem, Supplier } from "../model";

export type PurchaseItem = {
  item: InventoryItem,
  qty: number,
  price: number
}

export type PurchasePayment = {
  payment_date?: string;
  payment_method?: PaymentMethod;
  amount?: number;
  note?: string;
}

export type PurchaseForm = {
  purchase_date?: string;
  total?: number;
  tax?: number;
	taxType?: DiscountType,
	discount?: number;
	discountType?: DiscountType;
  supplier?: Supplier;
  items?: PurchaseItem[];
  payments?: PurchasePayment[];
}