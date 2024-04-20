import { Model, Table, Column } from 'sequelize-typescript'

@Table({ timestamps: true })
export class Admin extends Model<Admin> {
  @Column
    name!: string

  @Column
    email!: string

  @Column
    password!: string
}
