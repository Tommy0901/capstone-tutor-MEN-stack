import { User } from './user'
import { Admin } from './admin'
import { Course } from './course'
import { Category } from './category'
import { Registration } from './registration'
import { TeachingCategory } from './teaching-category'
import { Sequelize, type SequelizeOptions } from 'sequelize-typescript'
import config from '../config/config.json'

const env = process.env.NODE_ENV ?? 'development'
const sequelizeOptions = (config as any)[env] as SequelizeOptions

const sequelize = new Sequelize(sequelizeOptions)

sequelize.addModels([User, Admin, Course, Category, Registration, TeachingCategory])

export { User, Admin, Course, Category, Registration, TeachingCategory }
