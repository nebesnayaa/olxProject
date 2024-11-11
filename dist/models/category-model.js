var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Advertisement } from "./ad-model.js";
let Category = class Category extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
], Category.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING(25),
        allowNull: false
    })
], Category.prototype, "name", void 0);
__decorate([
    ForeignKey(() => Category),
    Column({
        type: DataType.INTEGER,
        allowNull: false
    })
], Category.prototype, "parent_id", void 0);
__decorate([
    BelongsTo(() => Category)
], Category.prototype, "category", void 0);
__decorate([
    HasMany(() => Advertisement)
], Category.prototype, "advertisements", void 0);
Category = __decorate([
    Table({
        tableName: "categories",
        timestamps: false,
    })
], Category);
export { Category };
