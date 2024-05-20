import { type Request, type Response, type NextFunction } from 'express'
import { Op } from 'sequelize'

import { User, Category, Course, Registration } from '../models'

import { type AuthenticatedRequest } from '../middlewares/auth-handler'

import { errorMsg } from '../helpers/message-helper'
import { type MulterFile, uploadSingleImageToS3 } from '../helpers/image-helper'
import { allNotNullOrEmpty, sanitizeFileName } from '../helpers/validation-helper'
import {
  type AvailableDaysCount,
  type FormattedCourse,
  currentTaipeiTime,
  confirmAvailability,
  confirmAvailabilityConflicts,
  confirmScheduledHoursConflicts,
  formatCourseStartAt,
  formattedTimestamp
} from '../helpers/time-helper'

class CourseController {
  getCoursesByTeacher (req: Request, res: Response, next: NextFunction): void {
    const { user: { id } } = req as AuthenticatedRequest

    void (async () => {
      try {
        const courses = await Course.findAll({
          attributes: ['id', 'teacherId', 'category', 'name', 'intro', 'link', 'duration', 'image', 'startAt'],
          where: { teacherId: id },
          raw: true
        })

        const data = courses.map(course => ({
          ...course,
          startAt: formatCourseStartAt(course.startAt)
        }))

        res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }

  postCourse (req: Request, res: Response, next: NextFunction): Record<string, any> | undefined {
    const { user: { id, isTeacher } } = req as AuthenticatedRequest
    const { body: { category, name, intro, link, duration, startAt }, file } = req

    if (isTeacher === 0) return errorMsg(res, 403, 'Insufficient permission. Unable to create a new course!')

    if (allNotNullOrEmpty(category, name, intro, link, duration, startAt)) {
      return errorMsg(res, 400, 'Category, name, intro, link, duration, and startAt fields must not be empty.')
    }

    if (!Array.isArray(category) || category?.length < 1) return errorMsg(res, 400, 'Please enter categoryId array!')

    if (startAt <= currentTaipeiTime(new Date())) return errorMsg(res, 400, 'The course cannot open in the past.')

    if (duration !== 30 && duration !== 60) return errorMsg(res, 400, 'Course duration must be either 30 minutes or 60 minutes.')

    void (async () => {
      try {
        const [categories, availableDaysCount, scheduledHours] = await Promise.all([
          Category.findAll({
            raw: true
          }),
          User.findByPk(id, {
            attributes: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            raw: true
          }) as unknown as AvailableDaysCount,
          Course.findAll({
            attributes: ['duration', 'startAt'],
            where: {
              teacherId: id,
              startAt: { [Op.gt]: new Date() }
            },
            raw: true
          })
        ])

        if (!confirmAvailability(availableDaysCount)) return errorMsg(res, 400, 'Please select available days first.')

        if (!confirmAvailabilityConflicts(availableDaysCount, startAt as 'YYYY-MM-DD HH:mm')) {
          return errorMsg(res, 400, "Class schedule conflicts with teacher's availability.")
        }

        if (confirmScheduledHoursConflicts(scheduledHours, startAt as 'YYYY-MM-DD HH:mm', duration as number)) {
          return errorMsg(res, 400, "The course opening time conflicts with the teacher's class schedule.")
        }

        const hasDuplicate = new Set(category).size !== category.length
        if (hasDuplicate) return errorMsg(res, 403, 'The course categoryId has been used more than once.')

        const categoryNames = category.reduce<string[]>((acc, curr) => {
          const matchedItem = categories.find(item => item.id === curr)
          if (matchedItem != null) acc.push(matchedItem.name)
          return acc
        }, [])

        if (categoryNames.length === 0) return errorMsg(res, 400, 'Please input correct categoryId.')

        const fileName = `${sanitizeFileName(name as string)}_${formattedTimestamp()}_${id}`
        const filePath = await uploadSingleImageToS3(file as MulterFile, fileName) ?? ''

        const newCourse = {
          teacherId: id,
          category: categoryNames,
          name,
          intro,
          link,
          duration,
          image: filePath,
          startAt
        }

        const createdCourse = await Course.create(newCourse as Course)

        const { createdAt, updatedAt, ...data } = createdCourse.dataValues as FormattedCourse

        data.startAt = formatCourseStartAt(startAt + '')

        res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }

  getCourse (req: Request, res: Response, next: NextFunction): void {
    const { params: { courseId }, user: { id } } = req as AuthenticatedRequest

    void (async () => {
      try {
        const course = await Course.findByPk(courseId, {
          attributes: ['id', 'teacherId', 'category', 'name', 'intro', 'link', 'duration', 'image', 'startAt'],
          include: [{
            model: Registration,
            attributes: ['id', 'studentId', 'courseId', 'rating', 'comment'],
            order: [['createdAt', 'DESC']],
            include: [{
              model: User,
              attributes: ['id', 'name']
            }]
          }]
        })

        if (course == null) return errorMsg(res, 404, "Course didn't exist!")

        if (id !== course.teacherId) return errorMsg(res, 403, 'Insufficient permissions.')

        const { ...data } = course.dataValues as FormattedCourse

        data.startAt = formatCourseStartAt(data.startAt)

        res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }

  putCourse (req: Request, res: Response, next: NextFunction): Record<string, any> | undefined {
    const { params: { courseId }, user: { id } } = req as AuthenticatedRequest
    const { body: { category, name, intro, link, duration, startAt }, file } = req

    if (allNotNullOrEmpty(category, name, intro, link, duration, startAt)) {
      return errorMsg(res, 400, 'Category, name, intro, link, duration, and startAt fields must not be empty.')
    }

    if (!Array.isArray(category) || category?.length < 1) return errorMsg(res, 400, 'Please enter categoryId array!')

    if (startAt <= currentTaipeiTime(new Date())) return errorMsg(res, 400, 'Course opening time should not be in the past.')

    if (duration !== 30 && duration !== 60) return errorMsg(res, 400, 'Course duration must be either 30 minutes or 60 minutes.')

    void (async () => {
      try {
        const [categories, availableDaysCount, scheduledHours, course] = await Promise.all([
          Category.findAll({
            raw: true
          }),
          User.findByPk(id, {
            attributes: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            raw: true
          }) as unknown as AvailableDaysCount,
          Course.findAll({
            attributes: ['duration', 'startAt'],
            where: {
              id: { [Op.ne]: courseId },
              teacherId: id,
              startAt: { [Op.gt]: new Date() }
            },
            raw: true
          }),
          Course.findByPk(courseId)
        ])

        if (course == null) return errorMsg(res, 404, "Course didn't exist!")

        if (id !== course.teacherId) return errorMsg(res, 403, 'Insufficient permissions. Update failed!')

        if (!confirmAvailability(availableDaysCount)) return errorMsg(res, 400, 'Please select available days first.')

        if (!confirmAvailabilityConflicts(availableDaysCount, startAt as 'YYYY-MM-DD HH:mm')) {
          return errorMsg(res, 400, "Class schedule conflicts with teacher's availability.")
        }

        if (confirmScheduledHoursConflicts(scheduledHours, startAt as 'YYYY-MM-DD HH:mm', duration as number)) {
          return errorMsg(res, 400, "The course opening time conflicts with the teacher's class schedule.")
        }

        const hasDuplicate = new Set(category).size !== category.length
        if (hasDuplicate) return errorMsg(res, 403, 'The course categoryId has been used more than once.')

        const categoryNames = category.reduce<string[]>((acc, curr) => {
          const matchedItem = categories.find(item => item.id === curr)
          if (matchedItem != null) acc.push(matchedItem.name)
          return acc
        }, [])

        if (categoryNames.length === 0) return errorMsg(res, 400, 'Please input correct categoryId.')

        const fileName = `${sanitizeFileName(name as string)}_${formattedTimestamp()}_${id}`
        const filePath = await uploadSingleImageToS3(file as MulterFile, fileName) ?? course.image

        const fields = {
          category: categoryNames,
          name,
          intro,
          link,
          duration,
          image: filePath,
          startAt
        }

        const updatedCourse = await course.update(fields)

        const { createdAt, updatedAt, ...data } = updatedCourse.dataValues as FormattedCourse

        data.startAt = formatCourseStartAt(startAt + '')

        res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }

  deleteCourse (req: Request, res: Response, next: NextFunction): void {
    const { params: { courseId }, user: { id } } = req as AuthenticatedRequest

    void (async () => {
      try {
        const course = await Course.findByPk(courseId)

        if (course == null) return errorMsg(res, 404, "Course didn't exist!")

        if (id !== course.teacherId) return errorMsg(res, 403, 'Insufficient permissions.')

        const { createdAt, updatedAt, ...data } = course.dataValues as FormattedCourse

        data.startAt = formatCourseStartAt(data.startAt)

        const result = await Course.destroy({
          where: {
            id: courseId,
            teacherId: id
          }
        }) === 1

        !result
          ? errorMsg(res, 500, 'Delete course failed, Database Error.')
          : res.json({ status: 'success', data })
      } catch (err) {
        next(err)
      }
    })()
  }
}

export default CourseController
