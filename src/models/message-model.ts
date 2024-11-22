import { Table, Model, Column, ForeignKey, BelongsTo, DataType, HasOne, HasMany } from "sequelize-typescript";
import { User } from "./user-model.js";
import { Advertisement } from "./advert-model.js";

@Table({
  tableName: "messages",
  timestamps: false,
})

export class Message extends Model{
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  content!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  timestamp!: Date;

  @ForeignKey(() => Advertisement)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  ad_id!: number;

  @BelongsTo(()=>Advertisement)
  advertisement!: Advertisement;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  sender_id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  receiver_id!: number;

  @BelongsTo(()=>User)
  user!: User;
}