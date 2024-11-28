import { Router } from "express";
import { CategoryController } from "../controllers/category-controller.js";
export const categoryRoutes = Router();
categoryRoutes
    .route("/")
    .get(CategoryController.readAll)
    .post(CategoryController.createCategory);
categoryRoutes
    .route("/:id")
    .get(async (req, res) => {
    try {
        const advertisements = await CategoryController.readById(req, res);
        res.render("partials/advertisements", { advertisements });
    }
    catch (error) {
        console.error("Error loading home page:", error);
        res.status(500).send("Помилка при завантаженні головної сторінки");
    }
})
    .put(CategoryController.updateCategory)
    .delete(CategoryController.deleteCategory);
