import { type Response } from 'express'

export function errorMsg (res: Response, status: number, message: string): Record<string, any> {
  return res.status(status).json({ message })
}
