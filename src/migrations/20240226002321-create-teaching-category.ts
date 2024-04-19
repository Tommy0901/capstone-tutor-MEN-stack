import { type QueryInterface } from 'sequelize'

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS Teaching_categories (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        teacher_id INT NOT NULL,
        category_id INT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT teaching_categories_fk_user_id FOREIGN KEY (teacher_id) REFERENCES Users(id),
        CONSTRAINT teaching_categories_fk_category_id FOREIGN KEY (category_id) REFERENCES Categories(id) ON UPDATE CASCADE
      )`
    )
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      'DROP TABLE IF EXISTS Teaching_categories'
    )
  }
}
