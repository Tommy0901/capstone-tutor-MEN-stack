import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { User } from '../models'

import { errorMsg } from '../helpers/message-helper'

export interface AuthenticatedRequest extends Request {
  user: {
    id: number
    isTeacher: number
    email: string
    iat: number
    exp: number
  }
}

export function authenticated (req: Request, res: Response, next: NextFunction): Record<string, any> | undefined {
  const token = req.headers.authorization?.split(' ')[1]

  if (token == null) return errorMsg(res, 401, 'Unauthorized')

  if (process.env.JWT_SECRET == null || process.env.JWT_SECRET === '') throw new Error('JWT_SECRET is not defined')

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    // 捕獲 JWT 驗證錯誤
    return errorMsg(res, 401, `${(err as Error).message}`)
  }

  const { id } = (req as AuthenticatedRequest).user

  void (async () => {
    try {
      const userNotFound = await User.findByPk(id, {
        attributes: ['isTeacher'],
        raw: true
      }) as unknown as { isTeacher: number }

      if (userNotFound == null) {
        return errorMsg(res, 401, 'Invalid jwt token')
      }

      (req as AuthenticatedRequest).user.isTeacher = userNotFound.isTeacher

      next()
    } catch (err) {
      next(err)
    }
  })()
}
