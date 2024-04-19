import { Model, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from './user'
import { Category } from './category'

@Table({ modelName: 'Teaching_category', tableName: 'Teaching_categories', timestamps: true })
export class TeachingCategory extends Model<TeachingCategory> {
  @ForeignKey(() => User)
  @Column
    teacherId!: number

  @ForeignKey(() => Category)
  @Column
    categoryId!: number

  @BelongsTo(() => User)
    teacher!: User

  @BelongsTo(() => Category)
    category!: Category
}
