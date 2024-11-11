import "dotenv/config";
import { Sequelize  } from "sequelize-typescript";
import { User } from "../models/user-model.js"
import { Token } from "../models/token-model.js";
import { Advertisement } from "../models/ad-model.js";
import { Message } from "../models/message-model.js";
import { Category } from "../models/category-model.js";
import { Photo } from "../models/photo-model.js";

export const connection = new Sequelize({
  dialect: "mysql",
  timezone: process.env.DB_TIMEZONE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User, Token, Advertisement, Message, Category, Photo], 
});