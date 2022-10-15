import { Response } from 'express'

export interface BaseResponseBody {
  message?: string
  data?: any
  ok: boolean
}
