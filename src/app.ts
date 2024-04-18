import express, { type Request, type Response } from 'express'
import cors from 'cors'

import { Sequelize, type SequelizeOptions } from 'sequelize-typescript'

import config from './config/config.json'

const env = process.env.NODE_ENV ?? 'development'
const sequelizeOptions = (config as any)[env] as SequelizeOptions

const sequelize = new Sequelize(sequelizeOptions)

void (async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()

const app = express()
const port = process.env.PORT ?? 3000

app.use(cors(), express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => { console.info(`Server is running on http://localhost:${port}`) })

export default app
