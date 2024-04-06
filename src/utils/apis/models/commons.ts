import type { InventoryItem } from "./model"

export type TimeStamp = {
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
}

export type PaymentMethod = 'cash' | 'transfer' | 'ewallet' | 'qris' | 'other'

export type DiscountType = 'percent' | 'value'

export type ItemType = 'PART' | 'OLI' | 'ACC'

export type PaymentStatusList = {
	label: string,
	value: number
}

export const paymentStatusList: PaymentStatusList[] = [
	{
		label: 'Lunas',
		value: 1
	},
	{
		label: 'Belum Lunas',
		value: 0
	}
]