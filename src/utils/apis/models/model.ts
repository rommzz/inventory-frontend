import type { TimeStamp } from "./commons"

export type User = {
  id: string
  name: string
  email: string
  phone: string
  role_id: string
  password: string
  username: string
} & TimeStamp