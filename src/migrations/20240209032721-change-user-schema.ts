import { type QueryInterface } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
        ADD COLUMN mon BOOLEAN DEFAULT 0 NOT NULL AFTER self_intro,
        ADD COLUMN tue BOOLEAN DEFAULT 0 NOT NULL AFTER mon,
        ADD COLUMN wed BOOLEAN DEFAULT 0 NOT NULL AFTER tue,
        ADD COLUMN thu BOOLEAN DEFAULT 0 NOT NULL AFTER wed,
        ADD COLUMN fri BOOLEAN DEFAULT 0 NOT NULL AFTER thu,
        ADD COLUMN sat BOOLEAN DEFAULT 0 NOT NULL AFTER fri,
        ADD COLUMN sun BOOLEAN DEFAULT 0 NOT NULL AFTER sat;
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
