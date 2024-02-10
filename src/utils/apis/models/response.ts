import type { User } from "./model"

export type LoginResponse = {
  user: User
  token: string
  refresh_token: string
}