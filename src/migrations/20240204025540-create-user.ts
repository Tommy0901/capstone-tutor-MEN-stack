import { type QueryInterface } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        nickname VARCHAR(20),
        avatar VARCHAR(255),
        total_study INT DEFAULT 0 NOT NULL,
        is_teacher TINYINT DEFAULT 0 NOT NULL,
        teach_style VARCHAR(255),
        self_intro TEXT,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`
    )
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      'DROP TABLE IF EXISTS users'
    )
  }
}
