import { Router } from "express";
import { CategoryController } from "../controllers/category-controller.js";
import { AdvertController } from "../controllers/advert-controller.js";

const siteRoutes = Router();
siteRoutes.get("/", async (req, res) => {
  try {
    const categories = await CategoryController.readAll(req, res);

    const advertisements = await AdvertController.readAll(req, res);
 
    res.render("home", { categories, advertisements });
  } catch (error) {
    console.error("Error loading home page:", error);
    res.status(500).send("Помилка при завантаженні головної сторінки");
  }
});

export default siteRoutes;   
