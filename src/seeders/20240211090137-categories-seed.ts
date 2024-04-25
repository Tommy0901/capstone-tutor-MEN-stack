import { type QueryInterface } from 'sequelize'

const category = ['多益', '托福', '雅思', '商用英文', '生活會話', '旅遊英文', '新聞英文']

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('categories', category.map(item => ({ name: item })))
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('categories', {})
  }
}
