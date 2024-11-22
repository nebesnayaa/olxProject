import { Router } from "express";
import { CategoryController } from "../controllers/category-controller.js";

const siteRoutes = Router();
siteRoutes.get("/", CategoryController.readAll, (req, res) => res.render("home"));

export default siteRoutes;  
