import { type Request, type Response, type NextFunction } from 'express'

export function apiErrorHandler (err: any, req: Request, res: Response, next: NextFunction): any {
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
