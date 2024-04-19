import { type QueryInterface } from 'sequelize'

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE Users
        ADD COLUMN nation varchar(2) AFTER name;
    `)
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE Users
        DROP COLUMN nation;
    `)
  }
}
