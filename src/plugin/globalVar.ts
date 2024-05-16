import type { ItemType, PaymentMethod } from "@/utils/apis/models/commons"

export type PaymentMethodlist = {
	title: string,
	value: PaymentMethod,
}

export type ItemTypeList = {
	title: string,
	value: ItemType,
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

export const itemTypeList: ItemTypeList[] = [
	{
		title: 'Part',
		value: 'PART',
	},
	{
		title: 'Oli',
		value: 'OLI',
	},
	{
		title: 'Acc',
		value: 'ACC',
	},
]