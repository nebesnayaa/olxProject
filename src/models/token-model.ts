import { Table, Model, Column, ForeignKey, BelongsTo, DataType, HasOne, HasMany } from "sequelize-typescript";
import { User } from "./user-model.js";

@Table({
  tableName: "tokens",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})

export class Token extends Model{
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  refresh_token!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  expires_at!: string;

  @ForeignKey(()=>User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  user_id!: number;

  @BelongsTo(()=>User)
  user!: User;
}
