import { Request, Response,  } from "express";
import { Category } from "../models/category-model.js";


export class CategoryController{
  static async readAll(req: Request, res: Response): Promise<any> {
    try {
      const categories = await Category.findAll({
        where: { parent_id: null },
        include: [{ model: Category, as: "subcategories" }],
      });
 
      if (categories) {
        return res.render("categories", { categories });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Помилка отримання категорій", data: null });
    } 
  } 

  static async createCategory(req: Request, res: Response): Promise<any> {
    try{
      const { name, parent_id } = req.body; 
    
      const existingCategory = await Category.findOne({ where: { name } });
      if (existingCategory) {
        return res.status(400).send("Така категорія вже існує");
      }

      const newCategory = parent_id
        ? await Category.create({ name, parent_id })
        : await Category.create({ name });

      return res.status(201).json({ message: "Категорія створена", data: newCategory });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Помилка створення категорії" });
    }
  }

  static async updateCategory(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { name, parent_id } = req.body;

      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Категорію не знайдено" });
      }

      category.name = name || category.name;
      category.parent_id = parent_id || category.parent_id;

      await category.save();

      return res.status(200).json({ message: "Категорію оновлено", data: category });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Помилка оновлення категорії" });
    }
  }

  static async deleteCategory(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Категорію не знайдено" });
      }

      await category.destroy();
      return res.status(200).json({ message: "Категорію видалено" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Помилка видалення категорії" });
    }
  }

  static async readById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id, {
        include: [{ model: Category, as: "subcategories" }],
      });

      if (!category) {
        return res.status(404).json({ message: "Категорію не знайдено" });
      }

      return res.status(200).json({ message: "Категорію знайдено", data: category });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Помилка отримання категорії" });
    }
  }
}