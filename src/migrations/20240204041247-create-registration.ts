import { type QueryInterface } from 'sequelize'

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS Registrations (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        student_id INT NOT NULL,
        course_id INT NOT NULL,
        rating INT,
        comment TEXT,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT registrations_fk_user_id FOREIGN KEY (student_id) REFERENCES Users(id),
        CONSTRAINT registrations_fk_courses_id FOREIGN KEY (course_id) REFERENCES Courses(id)
      )`
    )
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      'DROP TABLE IF EXISTS Registrations'
    )
  }
}
