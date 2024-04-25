import { type QueryInterface } from 'sequelize'

import bcrypt from 'bcryptjs'

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('admins', [{
      name: 'root',
      email: 'root@example.com',
      password: await bcrypt.hash('12345678', 10)
    }])
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('admins', {})
  }
}
