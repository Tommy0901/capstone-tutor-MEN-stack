import { type Request, type Response, type NextFunction } from 'express'

import { User } from '../models'

import { type AuthenticatedRequest } from '../middlewares/auth-handler'
import { type ErrorResponse, errorMsg } from '../helpers/message-helper'

class AdminController {
  getAllUser (req: Request, res: Response, next: NextFunction): Response<ErrorResponse> | undefined {
    const { user: { email } } = req as AuthenticatedRequest

    if (email !== 'root@example.com') {
      return errorMsg(res, 403, 'Insufficient permission.')
    }

    void (async () => {
      try {
        const users = await User.findAll({
          attributes: ['id', 'name', 'isTeacher'],
          raw: true
        })

        res.json({ status: 'success', data: users })
      } catch (err) {
        next(err)
      }
    })()
  }
}

export default AdminController
