import { type QueryInterface } from 'sequelize'

import { User, Category } from '../models'

function shuffleArray (array: Array<{ id: number }>): Array<{ id: number }> {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function getRandomCategoryIds (array: Array<{ id: number }>): number[] {
  const shuffledArray = shuffleArray([...array]) // 創建數組副本並打亂
  const count = Math.floor(Math.random() * array.length) + 1 // 隨機決定要取出的元素個數

  return shuffledArray
    .slice(0, count)
    .sort((a, b) => a.id - b.id)
    .map(i => i.id)
}

export default {
  up: async (queryInterface: QueryInterface) => {
    const [teachers, categories] = await Promise.all([
      User.findAll({
        attributes: ['id'],
        where: { isTeacher: true },
        raw: true
      }),
      Category.findAll({
        attributes: ['id'],
        order: [['id', 'ASC']],
        raw: true
      })
    ])

    const teachingCategories = teachers.flatMap((_, i) => {
      const categoryIds = getRandomCategoryIds(categories as Array<{ id: number }>)

      return categoryIds.map((_, j) => ({
        teacher_id: teachers[i].id,
        category_id: categoryIds[j]
      }))
    })

    await queryInterface.bulkInsert('teaching_categories', teachingCategories)
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('teaching_categories', {})
  }
}
