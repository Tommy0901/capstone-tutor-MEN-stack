import sequelize, { User, Category, TeachingCategory, Course } from '../models'

import { faker } from '@faker-js/faker'

import { getRandomArraryElements } from '../helpers/random-items-helper'
import { upcomingCourseDates } from '../helpers/time-helper'

void (async () => {
  try {
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
    const courses = []

    courses.push(...teachers.flatMap(teacher => {
      const { id, teachingCategories, ...freeDays } = teacher
      const futureCourseDates = upcomingCourseDates(freeDays)

      const courseDates = []

      const firstCouseDate = futureCourseDates[randomIndex(futureCourseDates)]
      let secondCoursDate = futureCourseDates[randomIndex(futureCourseDates)]

      do {
        secondCoursDate = futureCourseDates[randomIndex(futureCourseDates)]
      } while (secondCoursDate === firstCouseDate)

      courseDates.push(firstCouseDate, secondCoursDate)

      return courseDates.map(courseDate => ({
        teacherId: id,
        category: getRandomArraryElements(teachingCategories),
        name: faker.lorem.word(),
        intro: faker.lorem.paragraph(),
        link: faker.internet.url(),
        duration: (Math.floor(Math.random() * 2) !== 0) ? 30 : 60,
        image: 'https://fakeimg.pl/300/?text=course%20img',
        startAt: courseDate
      }))
    }))

    await Course.bulkCreate(courses as unknown as Course[])
  } catch (err) {
    console.log(err)
  } finally {
    await sequelize.close()
  }
})()
