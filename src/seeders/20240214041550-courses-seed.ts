import { type QueryInterface } from 'sequelize'

import { faker } from '@faker-js/faker'
import { User, TeachingCategory, Category } from '../models'
import { upcomingCourseDates, pastCourseDates } from '../helpers/time-helper'
import { getRandomArraryElements } from '../helpers/random-items-helper'

export default {
  up: async (queryInterface: QueryInterface) => {
    const teachers = (await User.findAll({
      attributes: ['id', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      include: {
        model: TeachingCategory,
        attributes: ['categoryId'],
        include: [{
          model: Category,
          attributes: ['name']
        }]
      },
      where: { isTeacher: true }
    })).map(teacher => ({
      ...teacher.toJSON(),
      teachingCategories: teacher.teachingCategories.map((i) => i.category.name)
    }))

    const randomIndex = (Array: string[]): number => Math.floor(Math.random() * Array.length)

    const courses = teachers.flatMap(teacher => {
      const { id, teachingCategories, ...freeDays } = teacher

      const historicalCourseDates = pastCourseDates(freeDays)
      const futureCourseDates = upcomingCourseDates(freeDays)

      const firstCouseDate = historicalCourseDates[randomIndex(historicalCourseDates)]
      let secondCoursDate = historicalCourseDates[randomIndex(historicalCourseDates)]

      do {
        secondCoursDate = historicalCourseDates[randomIndex(historicalCourseDates)]
      } while (secondCoursDate === firstCouseDate)

      const thirdCouseDate = futureCourseDates[randomIndex(futureCourseDates)]
      let fourthCoursDate = futureCourseDates[randomIndex(futureCourseDates)]

      do {
        fourthCoursDate = futureCourseDates[randomIndex(futureCourseDates)]
      } while (fourthCoursDate === thirdCouseDate)

      const courseDates = [firstCouseDate, secondCoursDate, thirdCouseDate, fourthCoursDate]

      return courseDates.map(courseDate => ({
        teacher_id: id,
        category: JSON.stringify(getRandomArraryElements(teachingCategories)),
        name: faker.lorem.word(),
        intro: faker.lorem.paragraph(),
        link: faker.internet.url(),
        duration: (Math.floor(Math.random() * 2) !== 0) ? 30 : 60,
        image: 'https://fakeimg.pl/300/?text=course%20img',
        start_at: courseDate
      }))
    })

    await queryInterface.bulkInsert('courses', courses)
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('courses', {})
  }
}
