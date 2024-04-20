import { Model, Table, Column, HasMany } from 'sequelize-typescript'
import { TeachingCategory } from './teaching-category'

@Table({ timestamps: true })
export class Category extends Model<Category> {
  @Column
    name!: string

  @HasMany(() => TeachingCategory, { foreignKey: 'categoryId' })
    teachingCategories!: TeachingCategory[]
}
