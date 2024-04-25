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
      ),
      sequelize.query(
        'SELECT id FROM courses WHERE start_at < :todayDate;',
        { type: QueryTypes.SELECT, replacements: { todayDate: currentTaipeiTime(new Date()) } }
      ),
      sequelize.query(
        'SELECT id FROM courses WHERE start_at >= :todayDate;',
        { type: QueryTypes.SELECT, replacements: { todayDate: currentTaipeiTime(new Date()) } }
      )
    ])
    const registrations = []

    registrations.push(...Array.from({ length: expiredCourses.length }, (_, i) => ({
      student_id: (students[Math.ceil((i + 1) * students.length / expiredCourses.length) - 1] as { id: string }).id,
      course_id: (expiredCourses[i] as { id: string }).id,
      rating: Math.ceil(Math.random() * 5),
      comment: faker.lorem.paragraph()
    })))

    registrations.push(...Array.from({ length: upcomingCourses.length }, (_, i) => ({
      student_id: (students[Math.floor(Math.random() * students.length)] as { id: string }).id,
      course_id: (upcomingCourses[i] as { id: string }).id
    })))

    await queryInterface.bulkInsert('registrations', registrations)
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('registrations', {})
  }
}
