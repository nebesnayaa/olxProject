var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Model, Column, DataType, HasMany, HasOne } from "sequelize-typescript";
import { Advertisement } from "./advert-model.js";
import { Token } from "./token-model.js";
import { Message } from "./message-model.js";
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (UserRole = {}));
let User = class User extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], User.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: false
    })
], User.prototype, "login", void 0);
__decorate([
    Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true
    })
], User.prototype, "email", void 0);
__decorate([
    Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
], User.prototype, "password", void 0);
__decorate([
    Column({
        type: DataType.ENUM(...Object.values(UserRole)),
        allowNull: false,
        defaultValue: UserRole.USER,
    })
], User.prototype, "role", void 0);
__decorate([
    Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
], User.prototype, "status", void 0);
__decorate([
    Column({
        type: DataType.STRING(20),
        allowNull: false,
        unique: true
    })
], User.prototype, "phone", void 0);
__decorate([
    HasOne(() => Token)
], User.prototype, "token", void 0);
__decorate([
    HasMany(() => Advertisement)
], User.prototype, "advertisement", void 0);
__decorate([
    HasMany(() => Message)
], User.prototype, "message", void 0);
User = __decorate([
    Table({
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        scopes: {
            adminUsers: {
                where: { role: UserRole.ADMIN }
            },
        }
    })
], User);
export { User };
