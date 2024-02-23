export type BTableLimit = 10 | 15 | 20

export type BTableQuery = {
  limit: BTableLimit
  offset: number
  search?: string
}