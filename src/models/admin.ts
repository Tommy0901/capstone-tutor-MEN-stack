import { Model, Table, Column } from 'sequelize-typescript'

@Table({ tableName: 'Admins', timestamps: true })
export class Admin extends Model<Admin> {
  @Column
    name!: string

  @Column
    email!: string

  @Column
    password!: string
}
