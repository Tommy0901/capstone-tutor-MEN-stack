import { QueryTypes, type QueryInterface } from 'sequelize'

import { faker } from '@faker-js/faker'
import { currentTaipeiTime } from '../helpers/time-helper'

export default {
  up: async (queryInterface: QueryInterface) => {
    const { sequelize } = queryInterface
    const [students, expiredCourses, upcomingCourses] = await Promise.all([
      sequelize.query(
        'SELECT id FROM users WHERE is_teacher = 0;',
        { type: QueryTypes.SELECT }
      ) as unknown as Array<{ id: string }>,
      sequelize.query(
        'SELECT id FROM courses WHERE start_at < :todayDate;',
        { type: QueryTypes.SELECT, replacements: { todayDate: currentTaipeiTime(new Date()) } }
      ) as unknown as Array<{ id: string }>,
      sequelize.query(
        'SELECT id FROM courses WHERE start_at >= :todayDate;',
        { type: QueryTypes.SELECT, replacements: { todayDate: currentTaipeiTime(new Date()) } }
      ) as unknown as Array<{ id: string }>
    ])
    const averageIndex = (i: number): number => Math.ceil((i + 1) * students.length / expiredCourses.length) - 1
    const randomIndex = (i?: number): number => Math.floor(Math.random() * students.length)
    const registrations = []

    registrations.push(...expiredCourses.map((_, i) => ({
      student_id: (students[averageIndex(i)]).id,
      course_id: (expiredCourses[i]).id,
      rating: Math.ceil(Math.random() * 5),
      comment: faker.lorem.paragraph()
    })))

    registrations.push(...upcomingCourses.map((_, i) => ({
      student_id: (students[randomIndex()]).id,
      course_id: (upcomingCourses[i]).id
    })))

    await queryInterface.bulkInsert('registrations', registrations)
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('registrations', {})
  }
}
