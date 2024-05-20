import { type Request, type Response, type NextFunction } from 'express'
import sequelize, { Op } from 'sequelize'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { Admin, User, Category, Course, Registration, TeachingCategory } from '../models'

import countries from '../config/conuntries'

import { type AuthenticatedRequest } from '../middlewares/auth-handler'

import { errorMsg } from '../helpers/message-helper'
import { getOffset, getPagination } from '../helpers/pagination-helper'
import { currentTaipeiTime } from '../helpers/time-helper'
import { allNotNullOrEmpty, booleanObjects } from '../helpers/validation-helper'
import { type MulterFile, uploadSingleImageToS3 } from '../helpers/image-helper'

interface RequestBody {
  name: string
  email: string
  password: string
  confirmedPassword: string
}

interface UserData extends User {
  category: number[] // Add the category property
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

  signUp (req: Request, res: Response, next: NextFunction): Record<string, string> | undefined {
    const { name, email, password, confirmedPassword } = req.body as RequestBody

    if (allNotNullOrEmpty(name, email, password)) {
      return errorMsg(res, 400, 'Name, email, password are required fields.')
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

  signIn (req: Request, res: Response, next: NextFunction): Record<string, string> | undefined {
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

  getStudent (req: Request, res: Response, next: NextFunction): void {
    const { user: { id } } = req as AuthenticatedRequest

    void (async () => {
      try {
        const [user, rank] = await Promise.all([
          User.findByPk(id, {
            attributes: ['id', 'name', 'email', 'nickname', 'avatar', 'selfIntro'],
            include: {
              model: Registration,
              attributes: ['id', 'studentId', 'courseId', 'rating', 'comment'],
              include: [{
                model: Course,
                attributes: ['id', 'teacherId', 'category', 'name', 'intro', 'image', 'link', 'startAt', 'duration']
              }]
            }
          }),
          Registration.findAll({
            attributes: [
              'studentId',
              [sequelize.fn('SUM', sequelize.col('course.duration')), 'studyHours']
            ],
            include:
            { model: Course, attributes: [], where: { startAt: { [Op.lt]: new Date() } } },
            group: ['studentId'],
            order: [['studyHours', 'DESC']]
          })])

        if (user == null) return errorMsg(res, 404, "Student didn't exist!")

        user.dataValues.registrations = user.dataValues.registrations
          .map(item => {
            (item.dataValues.course.dataValues.startAt as unknown as string) = currentTaipeiTime(item.dataValues.course.dataValues.startAt)
            return item
          })
        user.dataValues.studyRank = rank.findIndex(i => i.dataValues.studentId === +id) + 1
        const studyHours = rank[user.dataValues.studyRank - 1]?.dataValues.studyHours
        user.dataValues.studyHours = studyHours != null ? studyHours / 60 : 0

        res.json({ status: 'success', data: user })
      } catch (err) {
        next(err)
      }
    })()
  }

  editStudent (req: Request, res: Response, next: NextFunction): void {
    void (async () => {
      try {
        const { params: { id }, user: { id: userId } } = req as AuthenticatedRequest

        if (+id !== userId) return errorMsg(res, 403, 'Permission denied!')

        const user = await User
          .findByPk((id), {
            attributes: ['id', 'name', 'email', 'nickname', 'avatar', 'selfIntro', 'createdAt', 'updatedAt'],
            raw: true
          })

        if (user == null) return errorMsg(res, 404, "Student didn't exist!")

        user.createdAt = currentTaipeiTime(user.createdAt as string)
        user.updatedAt = currentTaipeiTime(user.updatedAt as string)

        res.json({ status: 'success', data: user })
      } catch (err) {
        next(err)
      }
    })()
  }

  putStudent (req: Request, res: Response, next: NextFunction): void {
    void (async () => {
      try {
        const { params: { id }, user: { id: userId }, body: { name, nickname, selfIntro }, file } = req as AuthenticatedRequest

        if (+id !== userId) return errorMsg(res, 403, 'Insufficient permissions. Update failed!')

        if (name == null) return errorMsg(res, 401, 'Please enter name.')

        const [filePath, user] = await Promise.all([uploadSingleImageToS3(file as MulterFile, userId),
          User.findByPk(id, { attributes: ['id', 'name', 'email', 'nickname', 'avatar', 'selfIntro', 'createdAt', 'updatedAt'] })
        ])

        if (user == null) return errorMsg(res, 404, "Student didn't exist!")

        await user.update({ name, nickname, avatar: filePath ?? user.avatar, selfIntro })

        user.dataValues.createdAt = currentTaipeiTime(user.dataValues.createdAt as string)
        user.dataValues.updatedAt = currentTaipeiTime(user.dataValues.updatedAt as string)

        res.json({ status: 'success', data: user })
      } catch (err) {
        next(err)
      }
    })()
  }

  patchTeacher (req: Request, res: Response, next: NextFunction): void {
    const { params: { id }, user: { id: userId, isTeacher } } = req as AuthenticatedRequest

    void (async () => {
      try {
        if (isTeacher !== 0) return errorMsg(res, 403, 'Duplicate application for teacher. Update failed!')

        if (Number(id) !== userId) return errorMsg(res, 403, 'Insufficient permissions. Update failed!')

        await User.update({ isTeacher: true }, { where: { id } })

        const user = await User
          .findByPk(id, {
            attributes: ['id', 'name', 'email', 'isTeacher', 'createdAt', 'updatedAt'],
            raw: true
          })

        if (user == null) return errorMsg(res, 404, "Teacher didn't exist!")

        user.createdAt = currentTaipeiTime(user.createdAt as string)
        user.updatedAt = currentTaipeiTime(user.updatedAt as string)

        res.json({ status: 'success', data: user })
      } catch (err) {
        next(err)
      }
    })()
  }

  getTeacher (req: Request, res: Response, next: NextFunction): void {
    const { params: { id } } = req

    void (async () => {
      try {
        const [user, registrations] = await Promise.all([
          User.findOne({
            where: { id, isTeacher: true },
            include: [{
              model: TeachingCategory,
              attributes: ['categoryId'],
              include: [{
                model: Category,
                attributes: ['name']
              }]
            }, {
              model: Course,
              attributes: ['id', 'teacherId', 'category', 'name', 'intro', 'image', 'link', 'startAt', 'duration'],
              include: [{ model: Registration, attributes: ['rating', 'comment'] }]
            }]
          }),
          Registration.findAll({
            attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'ratingAverage']],
            include: { model: Course, attributes: [], where: { teacherId: id } },
            group: ['course.teacher_id']
          })
        ])

        if (user == null) return errorMsg(res, 404, "Teacher didn't exist!")

        user.dataValues.courses = user.dataValues.courses
          .map(item => {
            (item.dataValues.startAt as unknown as string) = currentTaipeiTime(item.dataValues.startAt)
            return item
          })

        const { password, isTeacher, createdAt, updatedAt, ...data } = user.toJSON()
        data.ratingAverage = registrations[0]?.toJSON().ratingAverage ?? undefined

        res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }

  editTeacher (req: Request, res: Response, next: NextFunction): void {
    const { params: { id }, user: { id: userId } } = req as AuthenticatedRequest

    void (async () => {
      try {
        if (Number(id) !== userId) return errorMsg(res, 403, 'Permission denied!')

        const user = await User.findByPk(id, {
          include: {
            model: TeachingCategory,
            attributes: ['categoryId'],
            include: [{
              model: Category,
              attributes: ['name']
            }]
          }
        })

        if (user == null) return errorMsg(res, 404, "Teacher didn't exist!")

        const { password, isTeacher, ...data } = user.toJSON()

        data.createdAt = currentTaipeiTime(data.createdAt as string)
        data.updatedAt = currentTaipeiTime(data.updatedAt as string)

        res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }

  putTeacher (req: Request, res: Response, next: NextFunction): void {
    const { params: { id }, user: { id: userId }, file } = req as AuthenticatedRequest
    const { body: { name, nation, nickname, teachStyle, selfIntro, category } } = req
    const { body: { mon, tue, wed, thu, fri, sat, sun } } = req
    const availableDays: Record<string, boolean> = { mon, tue, wed, thu, fri, sat, sun }

    void (async () => {
      try {
        if (Number(id) !== userId) return errorMsg(res, 403, 'Insufficient permissions. Update failed!')

        if (name == null) return errorMsg(res, 400, 'Please enter name.')

        if (!Array.isArray(category) || category?.length < 1) return errorMsg(res, 400, 'Please enter categoryId array.')

        const hasDuplicates = category.filter((value, index, self) => self.indexOf(value) !== index).length > 0
        if (hasDuplicates) return errorMsg(res, 400, 'CategoryId has duplicates.')

        if (!booleanObjects(availableDays)) return errorMsg(res, 400, 'Please select available days first.')

        if (!Object.keys(countries).includes(nation as string)) return errorMsg(res, 400, 'Input nation code was invalid.')

        let categoryId = await Category.findAll({ raw: true })
        categoryId = categoryId.map(i => String(i.id)) as unknown as Category[]

        if (!(category as Category[]).every(i => categoryId.includes(i))) return errorMsg(res, 400, 'Please enter correct categoryId.')

        const [filePath, user] = await Promise.all([
          uploadSingleImageToS3(file as MulterFile, userId), User.findByPk(id), TeachingCategory.destroy({ where: { teacherId: id } })
        ])

        const bulkCreateData = Array.from(
          { length: category.length },
          (_, i) => ({ teacherId: id, categoryId: category[i] as number })
        ) as unknown as TeachingCategory[]
        const teachingCategory = await TeachingCategory.bulkCreate(bulkCreateData)
        const updateFields = { name, nation, nickname, teachStyle, selfIntro, ...availableDays }

        if (user == null) return errorMsg(res, 404, "Teacher didn't exist!")

        await user.update({ avatar: filePath ?? user.avatar, ...updateFields })

        const { password, isTeacher, ...data } = user.toJSON() as unknown as UserData

        data.category = teachingCategory.map(i => i.dataValues.categoryId)
        data.createdAt = currentTaipeiTime(data.createdAt as string)
        data.updatedAt = currentTaipeiTime(data.updatedAt as string)

        res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }
}

export default UserController
