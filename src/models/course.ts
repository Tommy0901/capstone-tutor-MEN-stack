import { Model, Table, Column, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript'
import { User } from './user'
import { Registration } from './registration'

@Table({ tableName: 'Courses', timestamps: true })
export class Course extends Model<Course> {
  @ForeignKey(() => User)
  @Column
    teacherId!: number

  @Column
    category!: object

  @Column
    name!: string

  @Column
    intro!: string

  @Column
    link!: string

  @Column
    duration!: string | number

  @Column
    image!: string

  @Column
    startAt!: Date

  @BelongsTo(() => User)
    teacher!: User

  @HasMany(() => Registration, { foreignKey: 'courseId' })
    registrations!: Registration[]
}
