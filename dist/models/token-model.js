var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Model, Column, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { User } from "./user-model.js";
let Token = class Token extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
], Token.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING(255),
        allowNull: false
    })
], Token.prototype, "refresh_token", void 0);
__decorate([
    Column({
        type: DataType.DATE,
        allowNull: false
    })
], Token.prototype, "expires_at", void 0);
__decorate([
    ForeignKey(() => User),
    Column({
        type: DataType.INTEGER,
        allowNull: false
    })
], Token.prototype, "user_id", void 0);
__decorate([
    BelongsTo(() => User)
], Token.prototype, "user", void 0);
Token = __decorate([
    Table({
        tableName: "tokens",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    })
], Token);
export { Token };
