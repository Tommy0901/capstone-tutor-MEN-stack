import { type Request, type Response, type NextFunction } from 'express'
import dayjs from 'dayjs'

import { User, Course, Registration } from '../models'
import { Op } from 'sequelize'

import { type AuthenticatedRequest } from '../middlewares/auth-handler'
import { currentTaipeiTime, confirmScheduledHoursConflicts } from '../helpers/time-helper'
import { errorMsg } from '../helpers/message-helper'

interface RegistrationData extends Omit<Registration, 'createdAt' | 'updatedAt'> {
  createdAt: string | Date
  updatedAt: string | Date
}

interface CourseData extends Omit<Course, 'startAt' | 'createdAt' | 'updatedAt'> {
  startAt: string | Date
  createdAt: string | Date
  updatedAt: string | Date
}

class RegisterController {
  getRegistrations (req: Request, res: Response, next: NextFunction): void {
    const { query: { keyword }, user: { id: studentId } } = req as AuthenticatedRequest

    void (async () => {
      try {
        const registrations = await Registration.findAll({
          attributes: ['studentId', 'courseId', 'rating', 'comment'],
          where: {
            studentId
          },
          include: [{
            model: Course,
            attributes: [
              'name',
              'category',
              'intro',
              'link',
              'image',
              'duration',
              'startAt'
            ],
            ...(keyword != null && keyword !== '') && { where: { name: { [Op.substring]: keyword } } },
            include: [{
              model: User,
              attributes: ['id', 'name']
            }]
          }]
        })

        const registeredCourses = registrations.map(registration => {
          const { course } = registration.dataValues;
          (course.dataValues as CourseData).startAt = currentTaipeiTime(registration.dataValues.course.dataValues.startAt)

          return {
            ...registration.dataValues,
            course
          }
        })

        res.json({ status: 'success', data: { registeredCourses } })
      } catch (err) {
        next(err)
      }
    })()
  }

  getRegistrationsByCourse (req: Request, res: Response, next: NextFunction): void {
    const { params: { courseId }, user: { id: teacherId } } = req as AuthenticatedRequest

    void (async () => {
      try {
        const courseRegisters = await Registration.findAll({
          attributes: ['studentId', 'courseId', 'rating', 'comment'],
          where: { courseId },
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'email', 'nickname', 'avatar']
            },
            {
              model: Course,
              attributes: ['name', 'category', 'link', 'teacherId', 'startAt', 'duration']
            }
          ]
        })

        const courseTeacherId = courseRegisters[0].dataValues.course.teacherId
        if (courseTeacherId !== teacherId) return errorMsg(res, 403, 'Unable to browse this course booking records.')

        const data = courseRegisters.map(registration => {
          const { course } = registration.dataValues;
          (course.dataValues as CourseData).startAt = currentTaipeiTime(registration.dataValues.course.dataValues.startAt)

          return {
            ...registration.dataValues,
            course
          }
        })

        res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }

  postRegistration (req: Request, res: Response, next: NextFunction): void {
    const { params: { courseId }, user: { id: studentId } } = req as AuthenticatedRequest

    void (async () => {
      try {
        const [course, registrations] = await Promise.all([
          Course.findByPk(courseId, {
            attributes: [
              'name',
              'category',
              'intro',
              'link',
              'image',
              'duration',
              'startAt'
            ],
            include: [{
              model: User,
              attributes: ['id', 'name']
            }],
            raw: true,
            nest: true
          }),
          Registration.findAll({
            where: { studentId },
            include: [{
              model: Course,
              attributes: ['duration', 'startAt']
            }]
          })
        ])

        if (course == null) return errorMsg(res, 404, "Unable to register the course. Because the course didn't exist!")

        if (studentId === course.teacherId) {
          return errorMsg(res, 403, 'Teachers are not allowed to register for their own courses.')
        }

        if (new Date() > course.startAt) return errorMsg(res, 400, 'The course opening time has ended!')

        const courseIdSet = new Set(registrations.map(i => i.dataValues.courseId))

        if (courseIdSet.has(Number(courseId))) return errorMsg(res, 400, 'Duplicate registration for this course')

        const scheduledHours = registrations.map(i => ({
          startAt: i.dataValues.course.dataValues.startAt,
          duration: i.dataValues.course.dataValues.duration
        })) as CourseData[]

        const startAt = dayjs(course.startAt).format('YYYY-MM-DD HH:mm:ss') as 'YYYY-MM-DD HH:mm:ss'

        if (confirmScheduledHoursConflicts(scheduledHours, startAt, course.duration)) {
          return errorMsg(res, 400, 'There are scheduling conflicts with other courses.')
        }

        const newRegistration = {
          studentId,
          courseId: Number(courseId)
        }

        const data = (await Registration.create(newRegistration as Registration)).toJSON() as RegistrationData

        data.createdAt = currentTaipeiTime(data.createdAt)
        data.updatedAt = currentTaipeiTime(data.updatedAt)

        data.course = course;
        (data.course as CourseData).startAt = currentTaipeiTime(course.startAt)

        return data != null
          ? res.json({ status: 'success', data })
          : errorMsg(res, 500, 'Register course failed, Database error!')
      } catch (err) {
        next(err)
      }
    })()
  }

  putRegistration (req: Request, res: Response, next: NextFunction): void {
    const { params: { courseId }, body: { rating, comment }, user: { id: studentId } } = req as AuthenticatedRequest

    void (async () => {
      try {
        const isRatingAnInteger = Number.isInteger(rating) && rating > 0
        if (!isRatingAnInteger) return errorMsg(res, 400, 'Course rating should be integer!')

        const registration = await Registration.findOne({
          where: { studentId, courseId },
          include: [{
            model: Course,
            attributes: [
              'name',
              'category',
              'intro',
              'link',
              'image',
              'duration',
              'startAt'
            ],
            include: [{
              model: User,
              attributes: ['id', 'name']
            }]
          }]
        })

        if (registration == null) return errorMsg(res, 400, 'You have not registered for the course!')

        const { startAt } = registration.dataValues.course.dataValues

        if (currentTaipeiTime(new Date()) <= currentTaipeiTime(startAt)) return errorMsg(res, 400, 'The course has not started yet!')

        const updatedRegister = await registration.update({
          studentId,
          courseId: Number(courseId),
          rating,
          comment
        })

        const data = updatedRegister.toJSON() as RegistrationData

        data.createdAt = currentTaipeiTime(data.createdAt)
        data.updatedAt = currentTaipeiTime(data.updatedAt);
        (data.course as CourseData).startAt = currentTaipeiTime(data.course.startAt)

        res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }

  deleteRegistration (req: Request, res: Response, next: NextFunction): void {
    const { params: { courseId }, user: { id: studentId } } = req as AuthenticatedRequest

    void (async () => {
      try {
        const registration = (await Registration.findOne({ where: { studentId, courseId }, raw: true })) as RegistrationData

        if (registration == null) return errorMsg(res, 404, "Registration didn't exist!")

        registration.createdAt = currentTaipeiTime(registration.createdAt)
        registration.updatedAt = currentTaipeiTime(registration.updatedAt)

        const result = await Registration.destroy({ where: { studentId, courseId } }) === 1

        !result
          ? errorMsg(res, 500, 'Delete registration failed, Database Error.')
          : res.json({ status: 'success', data: registration })
      } catch (err) {
        next(err)
      }
    })()
  }
}

export default RegisterController
