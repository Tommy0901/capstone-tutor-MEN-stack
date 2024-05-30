import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import passport from '../config/passport'

import { User } from '../models'

import { processEnv } from '../helpers/env-helper'
import { type ErrorResponse, errorMsg } from '../helpers/message-helper'

export interface AuthenticatedRequest extends Request {
  user: {
    id: number
    isTeacher: number | boolean
    email: string
    iat: number
    exp: number
  }
}

export function authenticated (req: Request, res: Response, next: NextFunction): Response<ErrorResponse> | undefined {
  const token = req.headers.authorization?.split(' ')[1]

  if (token == null) return errorMsg(res, 401, 'Unauthorized')

  const secretOrPublicKey = processEnv('JWT_SECRET')

  try {
    req.user = jwt.verify(token, secretOrPublicKey)
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
      })

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

export function oauth (provider: 'facebook' | 'google') {
  return (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate(provider, { scope: ['email'] })(req, res, next)
  }
}

export function oauthCallback (provider: 'facebook' | 'google') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const callback: passport.AuthenticateCallback = (err, user) => {
      if (err != null || user === false || user == null) {
        return err != null
          ? res.status(500).json({ status: 'error', message: err.message })
          : res.status(401).json({ status: 'error', message: 'Authentication failed' })
      }

      const data = {
        ...user,
        token: jwt.sign({ ...user }, processEnv('JWT_SECRET'), { expiresIn: '30d' })
      }

      res.json({ status: 'success', data })
    }

    passport.authenticate(provider, callback)(req, res, next)
  }
}
