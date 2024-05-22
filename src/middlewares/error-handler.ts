import { type Request, type Response, type NextFunction } from 'express'

export function apiErrorHandler (err: Error | any, req: Request, res: Response, next: NextFunction): void {
  err instanceof Error
    ? res.status(500).json({
      status: 'error',
      message: err.message
    })
    : res.status(500).json({
      status: 'error',
      message: `${err}`
    })
  next(err)
}
