import { Model, Table, Column, HasMany } from 'sequelize-typescript'
import { TeachingCategory } from './teaching-category'
import { Course } from './course'
import { Registration } from './registration'

@Table({ tableName: 'Users', timestamps: true })
export class User extends Model<User> {
  @Column
    name!: string

  @Column
    nation!: string

  @Column
    email!: string

  @Column
    password!: string

  @Column
    nickname!: string

  @Column
    avatar!: string

  @Column
    isTeacher!: boolean

  @Column
    teachStyle!: string

  @Column
    selfIntro!: string

  @Column
    mon!: boolean

  @Column
    tue!: boolean

  @Column
    wed!: boolean

  @Column
    thu!: boolean

  @Column
    fri!: boolean

  @Column
    sat!: boolean

  @Column
    sun!: boolean

  @HasMany(() => TeachingCategory, { foreignKey: 'teacherId' })
    teachingCategories!: TeachingCategory[]

  @HasMany(() => Course, { foreignKey: 'teacherId' })
    courses!: Course[]

  @HasMany(() => Registration, { foreignKey: 'studentId' })
    registrations!: Registration[]
}
