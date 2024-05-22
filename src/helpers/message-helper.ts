import { type Response } from 'express'

export interface ErrorResponse {
  status: 'error'
  message: string
}

export function errorMsg (res: Response, status: number, message: string): Response<ErrorResponse> {
  return res.status(status).json({ status: 'error', message })
}
