var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Advertisement } from "./ad-model.js";
let Photo = class Photo extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
], Photo.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING(50),
        allowNull: false
    })
], Photo.prototype, "filepath", void 0);
__decorate([
    ForeignKey(() => Advertisement),
    Column({
        type: DataType.INTEGER,
        allowNull: false
    })
], Photo.prototype, "ad_id", void 0);
__decorate([
    BelongsTo(() => Advertisement)
], Photo.prototype, "advertisement", void 0);
Photo = __decorate([
    Table({
        tableName: "photos",
        timestamps: false,
    })
], Photo);
export { Photo };
