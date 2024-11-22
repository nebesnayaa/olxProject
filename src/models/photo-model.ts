import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Advertisement } from "./advert-model.js";

@Table ({
  tableName: "photos",
  timestamps: false,
})

export class Photo extends Model{
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  filepath!: string;

  @ForeignKey(() => Advertisement)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  ad_id!: number;

  @BelongsTo(() => Advertisement)
  advertisement!: Advertisement
}