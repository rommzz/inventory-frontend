import type { PaymentMethod } from "@/utils/apis/models/commons"

export const aymentMethod: {
	title: string,
	value: PaymentMethod,
}[] = [
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