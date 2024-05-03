import { type QueryInterface } from 'sequelize'

import { faker } from '@faker-js/faker'
import { User, TeachingCategory, Category } from '../models'
import { upcomingCourseDates, pastCourseDates, deDuplicateCourseDates } from '../helpers/time-helper'
import { getRandomIndexes } from '../helpers/random-indexes-helper'

export default {
  up: async (queryInterface: QueryInterface) => {
    const userDatas = await User.findAll({
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
    })
    const teachers = userDatas.map(user => {
      const teachers = user.toJSON()
      teachers.teachingCategories = teachers.teachingCategories.map((obj: { category: { name: any } }) => obj.category.name)
      return teachers
    })
    const courses = []
    const historicalCourseDates: any[] = []
    const futureCourseDates: any[] = []

    for (let i = 0; i < 2; i++) {
      courses.push(...Array.from({ length: teachers.length }, (_, i) => {
        const { id: teacherId, teachingCategories, ...whichDay } = teachers[i]
        const randomIndexes = getRandomIndexes(
          teachingCategories.length,
          Math.ceil(Math.random() * teachingCategories.length)
        )
        const category = JSON.stringify(randomIndexes.map(i => teachingCategories[i]))
        return {
          teacher_id: teacherId,
          category,
          name: faker.lorem.word(),
          intro: faker.lorem.paragraph(),
          link: faker.internet.url(),
          duration: (Math.floor(Math.random() * 2) !== 0) ? 30 : 60,
          image: 'https://fakeimg.pl/300/?text=course%20img',
          start_at: deDuplicateCourseDates(historicalCourseDates, pastCourseDates(whichDay), teachers.length, i)
        }
      }))
    }

    for (let i = 0; i < 2; i++) {
      courses.push(...Array.from({ length: teachers.length }, (_, i) => {
        const { id: teacherId, teachingCategories, ...whichDay } = teachers[i]
        const randomIndexes = getRandomIndexes(
          teachingCategories.length,
          Math.ceil(Math.random() * teachingCategories.length)
        )
        const category = JSON.stringify(randomIndexes.map(i => teachingCategories[i]))
        return {
          teacher_id: teacherId,
          category,
          name: faker.lorem.word(),
          intro: faker.lorem.paragraph(),
          link: faker.internet.url(),
          duration: (Math.floor(Math.random() * 2) !== 0) ? 30 : 60,
          image: 'https://fakeimg.pl/300/?text=course%20img',
          start_at: deDuplicateCourseDates(futureCourseDates, upcomingCourseDates(whichDay), teachers.length, i)
        }
      }))
    }

    await queryInterface.bulkInsert('courses', courses)
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('courses', {})
  }
}
