export type TimeStamp = {
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
}

export type PaymentMethod = 'cash' | 'transfer' | 'ewallet' | 'qris' | 'other'

export type DiscountType = 'percent' | 'value'