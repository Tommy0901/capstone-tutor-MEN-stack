import { type QueryInterface } from 'sequelize'

import { User, Category } from '../models'

export default {
  up: async (queryInterface: QueryInterface) => {
    const teachingCategories = []
    const teachers = await User.findAll({
      attributes: ['id'],
      where: { isTeacher: 1 }
    })
    const categories = (await (Category.findAll({
      attributes: ['id'],
      raw: true,
      order: [['id', 'ASC']]
    }))).map(i => i.id)

    teachingCategories.push(...Array.from({ length: teachers.length }, (_, i) => ({
      teacher_id: teachers[i].id,
      category_id: categories[Math.floor(Math.random() * categories.length)]
    })))

    const deDuplicateCategories = teachingCategories.map(item => item.category_id)

    teachingCategories.push(...Array.from({ length: teachers.length }, (_, i) => {
      const randomNumber = Math.floor(Math.random() * teachers.length)
      let categoryId = categories[Math.floor(Math.random() * categories.length)]
      do { categoryId = categories[Math.floor(Math.random() * categories.length)] }
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
