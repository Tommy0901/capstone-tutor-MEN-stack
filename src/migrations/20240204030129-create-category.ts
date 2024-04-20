import { type QueryInterface } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        name VARCHAR(80) UNIQUE NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`
    )
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      'DROP TABLE IF EXISTS categories'
    )
  }
}
