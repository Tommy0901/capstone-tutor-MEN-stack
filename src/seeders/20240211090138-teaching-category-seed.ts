import { type QueryInterface } from 'sequelize'

import { User } from '../models'

const category = ['多益', '托福', '雅思', '商用英文', '生活會話', '旅遊英文', '新聞英文']

export default {
  up: async (queryInterface: QueryInterface) => {
    const teachingCategories = []
    const teachers = await User.findAll({
      attributes: ['id'],
      where: { isTeacher: 1 }
    })

    teachingCategories.push(...Array.from({ length: teachers.length }, (_, i) => ({
      teacher_id: teachers[i].id,
      category_id: Math.ceil(Math.random() * category.length)
    })))

    const deDuplicateCategories = teachingCategories.map(item => item.category_id)

    teachingCategories.push(...Array.from({ length: teachers.length }, (_, i) => {
      const randomNumber = Math.floor(Math.random() * teachers.length)
      let categoryId = Math.ceil(Math.random() * category.length)
      do { categoryId = Math.ceil(Math.random() * category.length) }
      while (categoryId === deDuplicateCategories[randomNumber]) // 避免 seed 幫同一位老師建立重覆的 categoyId
      return {
        teacher_id: teachers[randomNumber].id,
        category_id: categoryId
      }
    }))

    await queryInterface.bulkInsert('teaching_categories', teachingCategories)
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('teaching_categories', {})
  }
}
