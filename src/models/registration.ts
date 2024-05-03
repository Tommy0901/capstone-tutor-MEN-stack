import { Model, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from './user'
import { Course } from './course'

@Table({ timestamps: true })
export class Registration extends Model<Registration> {
  @ForeignKey(() => User)
  @Column
    studentId!: number

  @ForeignKey(() => Course)
  @Column
    courseId!: number

  @Column
    rating!: number

  @Column
    comment!: string

  @BelongsTo(() => User)
    student!: User

  @BelongsTo(() => Course)
    course!: Course

  ratingAverage: number | undefined
  studyHours: number | undefined
}
