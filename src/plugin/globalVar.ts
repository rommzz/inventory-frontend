import type { PaymentMethod } from "@/utils/apis/models/commons"

export type PaymentMethodlist = {
	title: string,
	value: PaymentMethod,
}

export const paymentMethodlist: PaymentMethodlist[] = [
	{
		title: 'Cash',
		value: 'cash',
	},
	{
		title: 'Transfer',
		value: 'transfer',
	},
	{
		title: 'E-Wallet',
		value: 'ewallet',
	},
	{
		title: 'Qris',
		value: 'qris',
	},
	{
		title: 'Lainnya',
		value: 'other',
	},
]