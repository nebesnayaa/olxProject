import { Table, Model, Column, DataType, HasMany, HasOne} from "sequelize-typescript";
import { Advertisement } from "./advert-model.js";
import { Token } from "./token-model.js";
import { Message } from "./message-model.js";

enum UserRole {
  ADMIN = "admin",
  USER = "user"
}

@Table ({
  tableName: "users",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  scopes: {
    adminUsers:{
      where: { role: UserRole.ADMIN }
    },
  }
})

export class User extends Model{
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false, 
    unique: false
  })
  login!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false, 
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false, 
  })
  password!: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.USER,
  })
  role!: UserRole;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false, 
    defaultValue: true,
  })
  status!: boolean;

  @Column({
    type: DataType.STRING(20),
    allowNull: false, 
    unique: true
  })
  phone!: string;

  @HasOne(() => Token)
  token!: Token;

  @HasMany(() => Advertisement)
  advertisement!: Advertisement[];

  @HasMany(() => Message)
  message!: Message[];
}