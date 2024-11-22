import { Router } from "express";
import { CategoryController } from "../controllers/category-controller.js";
export const categoryRoutes = Router();
categoryRoutes
    .route("/")
    .get(CategoryController.readAll)
    .post(CategoryController.createCategory);
categoryRoutes
    .route("/:id")
    .get(CategoryController.readById)
    .put(CategoryController.updateCategory)
    .delete(CategoryController.deleteCategory);
