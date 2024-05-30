import { type Request, type Response, type NextFunction } from 'express'
import sequelize, { Op } from 'sequelize'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { Admin, User, Category, Course, Registration, TeachingCategory } from '../models'

import countries from '../config/conuntries'

import { type AuthenticatedRequest } from '../middlewares/auth-handler'

import { type ErrorResponse, errorMsg } from '../helpers/message-helper'
import { getOffset, getPagination } from '../helpers/pagination-helper'
import { currentTaipeiTime } from '../helpers/time-helper'
import { allNotNullOrEmpty, booleanObjects } from '../helpers/validation-helper'
import { type MulterFile, uploadSingleImageToS3 } from '../helpers/image-helper'
import { processEnv } from '../helpers/env-helper'

interface RequestBody {
  name: string
  email: string
  password: string
  passwordCheck: string
}

interface UserData extends Omit<User, 'createdAt' | 'updatedAt'> {
  createdAt: string | Date
  updatedAt: string | Date
  category: number[] // Add the category property
}

interface CourseData extends Omit<Course, 'startAt' | 'createdAt' | 'updatedAt'> {
  startAt: string | Date
  createdAt: string | Date
  updatedAt: string | Date
}

class UserController {
  homepage (req: Request, res: Response, next: NextFunction): void {
    const { query: { categoryId, keyword } } = req
    const page = (req.query.page != null && req.query.page !== '') ? req.query.page : 1
    const limit = 6
    const substringQuery = { [Op.substring]: keyword }
    const searchFields = ['name', 'nation', 'nickname', 'teachStyle', 'selfIntro']
      .map(field => ({ [field]: substringQuery }))

    void (async () => {
      try {
        const [teachers, students, categories] = await Promise.all([
          User.findAndCountAll({
            attributes: ['id', 'name', 'nation', 'nickname', 'avatar', 'teachStyle', 'selfIntro'],
            where: {
              isTeacher: true,
              ...(keyword != null && keyword === '') && { [Op.or]: searchFields }
            },
            include: {
              model: TeachingCategory,
              attributes: ['categoryId'],
              ...(categoryId != null && categoryId === '') && { where: { categoryId } },
              include: [{
                model: Category,
                attributes: ['name']
              }]
            },
            group: ['id'],
            limit,
            offset: getOffset(limit, Number(page))
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
            order: [['id', 'ASC']],
            raw: true
          })
        ])
        const whereCondition = { teacherId: { [Op.in]: teachers.rows.map(i => i.dataValues.id) } }

        const ratingAverage = await Registration.findAll({
          attributes: [
            [sequelize.fn('AVG', sequelize.col('rating')), 'ratingAverage']
          ],
          include: [
            { model: Course, attributes: [], where: whereCondition }
          ],
          group: ['course.teacher_id']
        })

        const teachersWithAverageRating = teachers.rows
          .map((teacher, i) => ({
            ...teacher.dataValues,
            ratingAverage: ratingAverage[i]?.dataValues.ratingAverage
          }))

        const studentsWithStudyHours = students
          .map(student => ({
            ...student.dataValues,
            studyHours: (student.dataValues.studyHours ?? 0) / 60
          }))

        const data = {
          ...getPagination(limit, Number(page), teachers.count.length),
          categories,
          teachers: teachersWithAverageRating,
          students: studentsWithStudyHours
        }

        res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }

  signUp (req: Request, res: Response, next: NextFunction): Response<ErrorResponse> | undefined {
    const { name, email, password, passwordCheck } = req.body as RequestBody

    if (allNotNullOrEmpty(name, email, password)) {
      return errorMsg(res, 400, 'Name, email, password are required fields.')
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return errorMsg(res, 400, 'The email format is invalid.')
    }

    if (password !== passwordCheck) {
      return errorMsg(res, 400, 'Password does not match the confirmed password.')
    }

    if (email === 'root@example.com') {
      return errorMsg(res, 409, 'Email has already been registered.')
    }

    void (async () => {
      try {
        const registeredEmail = await User.findOne({ where: { email }, raw: true })

        if (registeredEmail != null) {
          return errorMsg(res, 409, 'Email has already been registered.')
        }

        const newUser = {
          name,
          email,
          password: await bcrypt.hash(password, 10)
        }

        const user = await User.create(newUser as User)

        const { password: removedPassword, ...data } = user.toJSON() as UserData

        data.createdAt = currentTaipeiTime(data.createdAt)
        data.updatedAt = currentTaipeiTime(data.updatedAt)

        res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }

  signIn (req: Request, res: Response, next: NextFunction): Response<ErrorResponse> | undefined {
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

        const { isTeacher } = user as User

        const payload = {
          id: user.id,
          isTeacher,
          name: user.name,
          email: user.email
        }

        const secretOrPrivateKey = processEnv('JWT_SECRET')

        const options = { expiresIn: '30d' }

        await bcrypt.compare(password, user.password)
          ? res.json({
            status: 'success',
            data: {
              ...payload,
              token: jwt.sign(payload, secretOrPrivateKey, options)
            }
          })
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
        const [user, ranks] = await Promise.all([
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

        if (user == null) return errorMsg(res, 500, 'User data missing') // 於 Auth-handler middleware 對使用者是否存在已做過確認，按理不應該出現找不到使用者的狀況

        const studyRank = ranks.findIndex(i => i.dataValues.studentId === id) + 1
        const studyHours = (ranks[studyRank - 1]?.dataValues.studyHours ?? 0) / 60

        const data = {
          ...user.toJSON(),
          studyRank,
          studyHours
        }

        data.registrations.forEach(i => {
          (i.course as CourseData).startAt = currentTaipeiTime(i.course.startAt)
        })

        res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }

  editStudent (req: Request, res: Response, next: NextFunction): void {
    const { user: { id } } = req as AuthenticatedRequest

    void (async () => {
      try {
        const user = await User
          .findByPk(id, {
            attributes: ['id', 'name', 'email', 'nickname', 'avatar', 'selfIntro', 'createdAt', 'updatedAt'],
            raw: true
          }) as UserData | null

        if (user == null) return errorMsg(res, 500, 'User data missing') // 於 Auth-handler middleware 對使用者是否存在已做過確認，按理不應該出現找不到使用者的狀況

        user.createdAt = currentTaipeiTime(user.createdAt)
        user.updatedAt = currentTaipeiTime(user.updatedAt)

        res.json({ status: 'success', data: user })
      } catch (err) {
        next(err)
      }
    })()
  }

  putStudent (req: Request, res: Response, next: NextFunction): Response<ErrorResponse> | undefined {
    const { user: { id }, body: { name, nickname, selfIntro }, file } = req as AuthenticatedRequest

    if (name == null || name === '') return errorMsg(res, 400, 'Please enter name.')

    void (async () => {
      try {
        const [filePath, user] = await Promise.all([
          uploadSingleImageToS3(file as MulterFile, id),
          User.findByPk(id, {
            attributes: ['id', 'name', 'email', 'nickname', 'avatar', 'selfIntro', 'createdAt', 'updatedAt']
          })
        ])

        if (user == null) return errorMsg(res, 500, 'User data missing') // 於 Auth-handler middleware 對使用者是否存在已做過確認，按理不應該出現找不到使用者的狀況

        const fields = { name, nickname, avatar: filePath ?? user.avatar, selfIntro }

        const data = (await user.update(fields)).toJSON() as UserData | undefined

        if (data == null) return errorMsg(res, 500, 'DataBase Error. Update failed!')

        data.createdAt = currentTaipeiTime(data.createdAt)
        data.updatedAt = currentTaipeiTime(data.updatedAt)

        res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }

  patchTeacher (req: Request, res: Response, next: NextFunction): Response<ErrorResponse> | undefined {
    const { user: { id, isTeacher } } = req as AuthenticatedRequest

    if (isTeacher !== 0) return errorMsg(res, 409, 'Duplicate application for teacher. Update failed!')

    void (async () => {
      try {
        const user = await User.findByPk(id, {
          attributes: ['id', 'isTeacher', 'name', 'email', 'createdAt', 'updatedAt']
        })

        const fields = { isTeacher: true }

        if (user == null) return errorMsg(res, 500, 'User data missing') // 於 Auth-handler middleware 對使用者是否存在已做過確認，按理不應該出現找不到使用者的狀況

        const data = (await user.update(fields)).toJSON() as UserData

        if (data == null) return errorMsg(res, 500, 'DataBase Error. Update failed!')

        data.createdAt = currentTaipeiTime(data.createdAt)
        data.updatedAt = currentTaipeiTime(data.updatedAt)

        res.json({ status: 'success', data })
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

        const { password, isTeacher, createdAt, updatedAt, ...data } = user.toJSON()

        data.courses.forEach(course => {
          (course as CourseData).startAt = currentTaipeiTime(course.startAt)
        })
        data.ratingAverage = registrations[0]?.toJSON().ratingAverage ?? undefined

        res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }

  editTeacher (req: Request, res: Response, next: NextFunction): void {
    const { user: { id } } = req as AuthenticatedRequest

    void (async () => {
      try {
        const user = await User.findByPk(id, {
          attributes: {
            exclude: ['password', 'isTeacher']
          },
          include: {
            model: TeachingCategory,
            attributes: ['categoryId'],
            include: [{
              model: Category,
              attributes: ['name']
            }]
          }
        })

        if (user == null) return errorMsg(res, 500, 'User data missing') // 於 Auth-handler middleware 對使用者是否存在已做過確認，按理不應該出現找不到使用者的狀況

        user.dataValues.createdAt = currentTaipeiTime(user.dataValues.createdAt as Date)
        user.dataValues.updatedAt = currentTaipeiTime(user.dataValues.updatedAt as Date)

        res.json({ status: 'success', data: user })
      } catch (err) {
        next(err)
      }
    })()
  }

  putTeacher (req: Request, res: Response, next: NextFunction): Response<ErrorResponse> | undefined {
    const { user: { id }, file } = req as AuthenticatedRequest
    const { body: { name, nation, nickname, teachStyle, selfIntro, category } } = req
    const { body: { mon, tue, wed, thu, fri, sat, sun } } = req

    const availableDays: Record<string, boolean> = { mon, tue, wed, thu, fri, sat, sun }
    const categoryIds = Array.isArray(category) ? category : [category]

    if (name == null || name === '') return errorMsg(res, 400, 'Please enter name.')

    if (categoryIds.length < 1) return errorMsg(res, 400, 'Please enter categoryId array.')

    const hasDuplicates = new Set(categoryIds).size !== categoryIds.length
    if (hasDuplicates) return errorMsg(res, 400, 'CategoryId has duplicates.')

    if (!booleanObjects(availableDays)) return errorMsg(res, 400, 'The input value of available days should be boolean or undefined.')

    if (!Object.keys(countries).includes(nation as string)) return errorMsg(res, 400, 'Input nation code was invalid.')

    void (async () => {
      try {
        const categoryIdsSet = new Set((await Category.findAll({ raw: true })).map(i => i.id)) as Set<number>

        if (!categoryIds.every(i => categoryIdsSet.has(Number(i)))) return errorMsg(res, 400, 'Please enter correct categoryId.')

        const [filePath, user] = await Promise.all([
          uploadSingleImageToS3(file as MulterFile, id),
          User.findByPk(id),
          TeachingCategory.destroy({
            where: { teacherId: id }
          })
        ])

        if (user == null) return errorMsg(res, 500, 'User data missing') // 於 Auth-handler middleware 對使用者是否存在已做過確認，按理不應該出現找不到使用者的狀況

        const bulkCreateData = categoryIds.map((_, i) => ({
          teacherId: id,
          categoryId: category[i]
        })) as TeachingCategory[]

        const teachingCategory = await TeachingCategory.bulkCreate(bulkCreateData)
        const updateFields = { name, nation, nickname, teachStyle, selfIntro, ...availableDays }

        await user.update({ avatar: filePath ?? user.avatar, ...updateFields })

        const { password, isTeacher, ...data } = user.toJSON() as UserData

        data.category = teachingCategory.map(i => i.dataValues.categoryId)
        data.createdAt = currentTaipeiTime(data.createdAt)
        data.updatedAt = currentTaipeiTime(data.updatedAt)

        res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }
}

export default UserController
