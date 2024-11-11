var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Model, Column, ForeignKey, BelongsTo, DataType, HasMany } from "sequelize-typescript";
import { User } from "./user-model.js";
import { Category } from "./category-model.js";
import { Photo } from "./photo-model.js";
import { Message } from "./message-model.js";
let Advertisement = class Advertisement extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
], Advertisement.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING(100),
        allowNull: false
    })
], Advertisement.prototype, "title", void 0);
__decorate([
    Column({
        type: DataType.TEXT,
        allowNull: false
    })
], Advertisement.prototype, "description", void 0);
__decorate([
    Column({
        type: DataType.DECIMAL,
        allowNull: false
    })
], Advertisement.prototype, "price", void 0);
__decorate([
    Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
], Advertisement.prototype, "status", void 0);
__decorate([
    Column({
        type: DataType.DECIMAL,
        allowNull: false
    })
], Advertisement.prototype, "views", void 0);
__decorate([
    ForeignKey(() => User),
    Column({
        type: DataType.INTEGER,
        allowNull: false
    })
], Advertisement.prototype, "user_id", void 0);
__decorate([
    BelongsTo(() => User)
], Advertisement.prototype, "user", void 0);
__decorate([
    ForeignKey(() => Category),
    Column({
        type: DataType.INTEGER,
        allowNull: false
    })
], Advertisement.prototype, "category_id", void 0);
__decorate([
    BelongsTo(() => Category)
], Advertisement.prototype, "category", void 0);
__decorate([
    HasMany(() => Photo)
], Advertisement.prototype, "photos", void 0);
__decorate([
    HasMany(() => Message)
], Advertisement.prototype, "messages", void 0);
Advertisement = __decorate([
    Table({
        tableName: "advertisements",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    })
], Advertisement);
export { Advertisement };
