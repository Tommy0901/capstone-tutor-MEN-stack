import { type Request, type Response, type NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { Admin, User } from '../models'

import { errorMsg } from '../helpers/message-helper'
import { currentTaipeiTime } from '../helpers/time-helper'
import { allNotNullOrEmpty } from '../helpers/validation-helper'

interface RequestBody {
  name: string
  email: string
  password: string
  confirmedPassword: string
}

if (process.env.NODE_ENV !== 'production') dotenv.config()

class UserController {
  signUp (req: Request, res: Response, next: NextFunction): Record<string, any> | undefined {
    const { name, email, password, confirmedPassword } = req.body as RequestBody

    if (allNotNullOrEmpty(name, email, password)) {
      return errorMsg(res, 400, 'Name, email, and password are required fields.')
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return errorMsg(res, 400, 'The email format is invalid.')
    }

    if (password !== confirmedPassword) {
      return errorMsg(res, 400, 'Password does not match the confirmed password.')
    }

    if (email === 'root@example.com') {
      return errorMsg(res, 409, 'Email has already been registered.')
    }

    void (async () => {
      try {
        const registeredEmail = await User.findOne({ where: { email } })

        if (registeredEmail != null) {
          return errorMsg(res, 409, 'Email has already been registered.')
        }

        const newUser = {
          name,
          email,
          password: await bcrypt.hash(password, 10)
        }

        const user = await User.create(newUser as User)
        const { password: removedPassword, ...data } = user.toJSON()
        data.updatedAt = currentTaipeiTime(data.updatedAt as string)
        data.createdAt = currentTaipeiTime(data.createdAt as string)
        res.json({ data })
      } catch (err) {
        next(err)
      }
    })()
  }

  signIn (req: Request, res: Response, next: NextFunction): Record<string, any> | undefined {
    const { email, password } = req.body as RequestBody

    if (allNotNullOrEmpty(email, password)) {
      return errorMsg(res, 400, 'Please enter email and password.')
    }

    void (async () => {
      try {
        const findOptions = { where: { email }, raw: true }
        const user = await User.findOne(findOptions) ?? await Admin.findOne(findOptions)

        if (user == null) {
          return errorMsg(res, 401, 'Incorrect email or password!')
        }

        await bcrypt.compare(password, user.password)
          ? (process.env.JWT_SECRET != null)
              ? res.json({
                id: user.id,
                isTeacher: (user as unknown as { isTeacher: string }).isTeacher,
                email: user.email,
                token: jwt.sign(
                  {
                    id: user.id,
                    isTeacher: (user as unknown as { isTeacher: string }).isTeacher,
                    email: user.email
                  },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: '30d'
                  }
                )
              })
              : errorMsg(res, 500, 'JWT token encountered a generation error.')
          : errorMsg(res, 401, 'Incorrect username or password!')
      } catch (err) {
        next(err)
      }
    })()
  }
}

export default UserController
