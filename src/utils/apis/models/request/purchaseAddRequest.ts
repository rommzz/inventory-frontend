import type { DiscountType } from "../commons";
import type { PurchaseItemForm, PurchasePaymentForm, Supplier } from "../model";


export type PurchaseForm = {
  purchase_date?: string;
	grand_total?: number;
  total?: number;
  tax?: number;
	taxType?: DiscountType,
	discount?: number;
	discountType?: DiscountType;
  supplier?: Supplier;
  items?: PurchaseItemForm[];
  payments?: PurchasePaymentForm[];
}