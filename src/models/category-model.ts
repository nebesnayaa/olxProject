import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Advertisement } from "./ad-model.js";

@Table ({
  tableName: "categories",
  timestamps: false,
})

export class Category extends Model{
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING(25),
    allowNull: false
  })
  name!: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  parent_id!: number;

  @BelongsTo(() => Category)
  category!: Category

  @HasMany(()=>Advertisement)
  advertisements!: Advertisement[];
}