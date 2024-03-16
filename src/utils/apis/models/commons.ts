export type TimeStamp = {
  created_at?: string
  updated_at?: string
  deleted_at?: string
}

export type PaymentMethod = 'cash' | 'transfer' | 'ewallet' | 'qris' | 'other'