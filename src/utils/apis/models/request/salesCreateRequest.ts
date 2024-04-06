
import type { DiscountType } from "../commons";
import type { Customer, PurchaseItemForm, PurchasePaymentForm } from "../model";

export type SalesForm = {
  customer?: Customer;
  tax?: number;
	taxType?: DiscountType,
	discount?: number;
	discountType?: DiscountType;
  saleDate?: string;
  items?: PurchaseItemForm[];
  payments?: PurchasePaymentForm[];
}
