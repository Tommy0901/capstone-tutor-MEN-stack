import { type QueryInterface } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
        ADD COLUMN mon BOOLEAN NOT NULL AFTER self_intro,
        ADD COLUMN tue BOOLEAN NOT NULL AFTER mon,
        ADD COLUMN wed BOOLEAN NOT NULL AFTER tue,
        ADD COLUMN thu BOOLEAN NOT NULL AFTER wed,
        ADD COLUMN fri BOOLEAN NOT NULL AFTER thu,
        ADD COLUMN sat BOOLEAN NOT NULL AFTER fri,
        ADD COLUMN sun BOOLEAN NOT NULL AFTER sat;
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
