import mysql from 'mysql2'
import config from '../config/config.json'

const env = process.env.NODE_ENV ?? 'development'
const { host, username: user, password, database } = (config as any)[env]

const connection = mysql.createConnection({ host, user, password })

connection.connect(err => {
  if (err != null) throw err
  console.log('Connected to MySQL server.')

  // Create database
  connection.query('USE ' + database, (err, result) => {
    if (err != null) {
      connection.query(
        `CREATE DATABASE IF NOT EXISTS ${database}`,
        (err, result) => {
          if (err != null) throw err
          console.log('Database created.')
          process.exit()
        }
      )
    } else {
      console.log('Database already exists.')
      process.exit()
    }
  })
})
