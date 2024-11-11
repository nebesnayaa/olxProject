var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Model, Column, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { User } from "./user-model.js";
import { Advertisement } from "./ad-model.js";
let Message = class Message extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
], Message.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.TEXT,
        allowNull: false
    })
], Message.prototype, "content", void 0);
__decorate([
    Column({
        type: DataType.TIME,
        allowNull: false
    })
], Message.prototype, "timestamp", void 0);
__decorate([
    ForeignKey(() => Advertisement),
    Column({
        type: DataType.INTEGER,
        allowNull: false
    })
], Message.prototype, "ad_id", void 0);
__decorate([
    BelongsTo(() => Advertisement)
], Message.prototype, "advertisement", void 0);
__decorate([
    ForeignKey(() => User),
    Column({
        type: DataType.INTEGER,
        allowNull: false
    })
], Message.prototype, "sender_id", void 0);
__decorate([
    ForeignKey(() => User),
    Column({
        type: DataType.INTEGER,
        allowNull: false
    })
], Message.prototype, "receiver_id", void 0);
__decorate([
    BelongsTo(() => User)
], Message.prototype, "user", void 0);
Message = __decorate([
    Table({
        tableName: "messages",
        timestamps: false,
    })
], Message);
export { Message };
