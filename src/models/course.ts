import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript'
import { User } from './user'
import { Registration } from './registration'

@Table({ timestamps: true })
export class Course extends Model<Course> {
  @ForeignKey(() => User)
  @Column
    teacherId!: number

  @Column(DataType.JSON)
    category!: string[]

  @Column
    name!: string

  @Column
    intro!: string

  @Column
    link!: string

  @Column
    duration!: number

  @Column
    image!: string

  @Column
    startAt!: Date

  @BelongsTo(() => User)
    teacher!: User

  @HasMany(() => Registration, { foreignKey: 'courseId' })
    registrations!: Registration[]
}
