import { clientRedis } from "../config/redis-config.js";
import { Request, Response, NextFunction } from "express";
import { Advertisement } from "../models/advert-model.js";
import { Category } from "../models/category-model.js";
import { User } from "../models/user-model.js";
import { Photo } from "../models/photo-model.js";
import { Op } from "sequelize";

export class AdvertController{
  
  static async readAll(req: Request, res: Response): Promise<any> {
    try {
      const adverts = await Advertisement.findAll({ 
        include: [User, Category],
        order: [["created_at", "DESC"]],
      });
 
      if (adverts) {
        return adverts;
      } else{
        return res.status(200).send({ message: "Оголошень немає" });
      }
    } catch (error) {
      console.error("Error rendering advertisements:", error);
      return res.status(500).json({ message: "Db Error", data: null });
    } 
  }
// static async readAll(req: Request, res: Response): Promise<any> {
  //   const advertsFromRedis = await clientRedis.get("adverts");
  //   if (advertsFromRedis) {
  //     console.log("Reading redis...");
  //     return res.status(200).json({ message: "List of adverts", data: JSON.parse(advertsFromRedis)});
  //   } 
  
  //   return res.status(500).json({ message: "Db Error", data: null });
  // }
  // static async createAdvert(
  //   req: Request<{}, {}, {
  //           title: string; 
  //           description: string; 
  //           price: number;
  //           user_id: number;
  //           category_id: number}>, 
  //   res: Response
  // ): Promise<any> {
  //   const newAdvert = await Advertisement.create({...req.body});

  //   if (newAdvert) {
  //     return res.status(201).json({ message: "Оголошення створено",  data: newAdvert });
  //   } 
  //   return res.status(500).json({ message: "Помилка створення оголошення", data: null });
  // }
  static async createAdvert(req: Request, res: Response): Promise<any> {
    try {
      const { title, description, price, user_id, category_id } = req.body;

      const newAdvert = await Advertisement.create({
        title, 
        description, 
        price,
        user_id,
        category_id
      });

      if (newAdvert) {
        return res.status(201).json({ message: "Оголошення ствроено",  data: newAdvert });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Помилка створення оголошення", data: null });
    }
  }

  static async readById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      const advert = await Advertisement.findByPk(id, 
        {include: [User, Category, Photo]});

      if (!advert) {
        return res.status(404).json({ message: "Оголошення не знайдено" });
      } 

      return res.status(200).json({ message: "Оголошення знайдено", data: advert });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Помилка отримання оголошення" });
    }
  }

  static async updateAdvert(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { title, description, price } = req.body;

      const advert = await Advertisement.findByPk(id);
      if (!advert) {
        return res.status(404).json({ message: "Оголошення не знайдено" });
      }

      advert.title = title || advert.title;
      advert.description = description || advert.description;
      advert.price = price || advert.price;

      await advert.save();

      return res.status(200).json({ message: "Користувача оновлено", data: advert });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Помилка оновлення користувача" });
    }
  }

  static async deleteCategory(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      const advert = await Advertisement.findByPk(id);
      if (!advert) {
        return res.status(404).json({ message: "Оголошення не знайдено" });
      }

      await advert.destroy();
      return res.status(200).json({ message: "Оголошення видалено" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Помилка видалення оголошення" });
    }
  }

  static async search(req: Request, res: Response): Promise<any> {
    try {
      const { query, minPrice, maxPrice, sortBy } = req.query;
      console.log(req.query);
      let filters: any = {};

      if (query) filters.title = { [Op.like]: `%${query}%` };
      if (minPrice)  filters.price = { ...filters.price, [Op.gte]: Number(minPrice) };
      if (maxPrice)  filters.price = { ...filters.price, [Op.lte]: Number(maxPrice) };

      let order: any = [];

      switch (sortBy) {
        case "created_at_desc":
          order = [["created_at", "DESC"]];
          break;
        case "created_at_asc":
          order = [["created_at", "ASC"]];
          break;
        case "price_desc":
          order = [["price", "DESC"]];
          break;
        case "price_asc":
          order = [["price", "ASC"]];
          break;
        default:
          order = [["created_at", "DESC"]]; // За замовчуванням сортування за датою
      }

      const advertisements = await Advertisement.findAll({
        where: filters,
        order: order,
        include: [User, Category],
      });
  
      if (advertisements) {
        return advertisements;
      } else{
        return res.status(200).json({ message: "Оголошень немає" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Db Error", data: null });
    }
  };
}