import { type QueryInterface } from 'sequelize'

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS Courses (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        teacher_id INT NOT NULL,
        category JSON,
        name VARCHAR(80) NOT NULL,
        intro TEXT NOT NULL,
        link VARCHAR(255) NOT NULL,
        duration INT NOT NULL,
        price INT DEFAULT 0 NOT NULL,
        image VARCHAR(255),
        start_at DATETIME NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT courses_fk_user_id FOREIGN KEY (teacher_id) REFERENCES Users(id)
      )`
    )
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      'DROP TABLE IF EXISTS Courses'
    )
  }
}
