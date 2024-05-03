import { type Request, type Response, type NextFunction } from 'express'
import sequelize, { Op } from 'sequelize'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { Admin, User, Category, Course, Registration, TeachingCategory } from '../models'

import { errorMsg } from '../helpers/message-helper'
import { getOffset, getPagination } from '../helpers/pagination-helper'
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
  homepage (req: Request, res: Response, next: NextFunction): void {
    const { query: { categoryId, keyword } } = req
    const likeKeywordObject = { [Op.like]: `%${keyword as string}%` }
    const [name, nation, nickname, teachStyle, selfIntro] = Array.from({ length: 5 }, () => likeKeywordObject)
    const searchFields = [{ name }, { nation }, { nickname }, { teachStyle }, { selfIntro }]
    const limit = 6
    const page = req.query.page ?? 1

    void (async () => {
      const [teachers, students, categories] = await Promise.all([
        User.findAndCountAll({
          attributes: ['id', 'name', 'nation', 'nickname', 'avatar', 'teachStyle', 'selfIntro'],
          where: {
            isTeacher: true,
            ...(keyword != null) ? { [Op.or]: searchFields } : {}
          },
          include: {
            model: TeachingCategory,
            attributes: ['categoryId'],
            ...(categoryId != null) ? { where: { categoryId } } : {},
            include: [{
              model: Category,
              attributes: ['name']
            }]
          },
          group: ['id'],
          limit,
          offset: getOffset(limit, page as number)
        }),
        Registration.findAll({
          attributes: [
            'studentId',
            [sequelize.fn('SUM', sequelize.col('course.duration')), 'studyHours']
          ],
          include: [
            { model: User, attributes: ['name', 'nickname', 'avatar'] },
            { model: Course, attributes: [], where: { startAt: { [Op.lt]: new Date() } } }
          ],
          group: ['studentId'],
          limit: 10,
          order: [['studyHours', 'DESC']]
        }),
        Category.findAll({
          attributes: ['id', 'name'],
          order: [['id', 'ASC']]
        })
      ])
      const whereCondition = { rating: { [Op.not]: null } }
      const ratingAverage = await Registration.findAll({
        attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'ratingAverage']],
        include: { model: Course, attributes: [], where: { teacherId: { [Op.in]: teachers.rows.map(i => i.dataValues.id) } } },
        where: whereCondition,
        group: ['course.teacher_id']
      })
      const data = { ...getPagination(limit, page as number, teachers.count.length) }
      data.categories = categories
      teachers.rows
        .forEach((teacher, i) => { teacher.dataValues.ratingAverage = ratingAverage[i]?.dataValues.ratingAverage })
      data.teachers = teachers.rows
      data.students = students
        .map(student => {
          student.dataValues.studyHours = (student.dataValues.studyHours != null) ? +student.dataValues.studyHours / 60 : undefined
          return student
        })
      res.json({ data })
    })()
  }

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
