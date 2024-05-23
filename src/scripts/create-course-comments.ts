import sequelize, { User, Course, Registration } from '../models'

import { faker } from '@faker-js/faker'

import { Op } from 'sequelize'

void (async () => {
  try {
    const [students, expiredCourses] = await Promise.all([
      User.findAll({
        attributes: ['id'],
        where: { isTeacher: true },
        raw: true
      }) as unknown as Array<{ id: number }>,
      Course.findAll({
        attributes: ['id'],
        where: { startAt: { [Op.lt]: new Date() } },
        raw: true
      }) as unknown as Array<{ id: number }>
    ])

    const randomArrayIndex = (array: any[]): number => Math.floor(Math.random() * array.length)
    const randomArrayElement = (array: any[]): any => array[randomArrayIndex(array)]

    const registrations = []

    registrations.push(...expiredCourses.map((_, i) => ({
      studentId: randomArrayElement(students).id,
      courseId: randomArrayElement(expiredCourses).id,
      rating: Math.ceil(Math.random() * 5),
      comment: faker.lorem.paragraph()
    })))

    await Registration.bulkCreate(registrations as unknown as Registration[])
  } catch (err) {
    console.log(err)
  } finally {
    await sequelize.close()
  }
})()
