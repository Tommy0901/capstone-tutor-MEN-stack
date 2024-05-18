import { type Request, type Response, type NextFunction } from 'express'

import jwt from 'jsonwebtoken'

import { errorMsg } from '../helpers/message-helper'

export function authenticated (req: Request, res: Response, next: NextFunction): any {
  const token = req.headers.authorization?.split(' ')[1]

  if (token == null) return errorMsg(res, 401, 'unauthorized')

  if (process.env.JWT_SECRET == null || process.env.JWT_SECRET === '') throw new Error('JWT_SECRET is not defined')

  req.user = jwt.verify(token, process.env.JWT_SECRET)

  next()
}
