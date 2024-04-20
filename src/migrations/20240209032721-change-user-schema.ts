import { type QueryInterface } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
        ADD COLUMN mon TINYINT DEFAULT 0 NOT NULL AFTER self_intro,
        ADD COLUMN tue TINYINT DEFAULT 0 NOT NULL AFTER mon,
        ADD COLUMN wed TINYINT DEFAULT 0 NOT NULL AFTER tue,
        ADD COLUMN thu TINYINT DEFAULT 0 NOT NULL AFTER wed,
        ADD COLUMN fri TINYINT DEFAULT 0 NOT NULL AFTER thu,
        ADD COLUMN sat TINYINT DEFAULT 0 NOT NULL AFTER fri,
        ADD COLUMN sun TINYINT DEFAULT 0 NOT NULL AFTER sat;
    `)
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
        DROP COLUMN mon,
        DROP COLUMN tue,
        DROP COLUMN wed,
        DROP COLUMN thu,
        DROP COLUMN fri,
        DROP COLUMN sat,
        DROP COLUMN sun;
    `)
  }
}
