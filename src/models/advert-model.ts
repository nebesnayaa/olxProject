import { Table, Model, Column, ForeignKey, BelongsTo, DataType, HasOne, HasMany } from "sequelize-typescript";
import { User } from "./user-model.js";
import { Category } from "./category-model.js";
import { Photo } from "./photo-model.js";
import { Message } from "./message-model.js";

@Table({
  tableName: "advertisements",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
})

export class Advertisement extends Model{
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false
  })
  price!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  status!: boolean;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    defaultValue: 0,
  })
  views!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  }) 
  category_id!: number;

  @BelongsTo(() => Category)
  category!: Category;

  @HasMany(()=> Photo)
  photos!: Photo[];

  @HasMany(()=> Message)
  messages!: Message[];
}