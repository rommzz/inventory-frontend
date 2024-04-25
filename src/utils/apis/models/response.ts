import type { User } from "./model"

export type LoginResponse = {
  user: User
  token: string
  refresh_token: string
}

export type GetProgressResponse = {
  progress: number
  step: string
  error: string
}
