import { type QueryInterface } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
        ADD COLUMN nation varchar(2) AFTER name;
    `)
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
        DROP COLUMN nation;
    `)
  }
}
