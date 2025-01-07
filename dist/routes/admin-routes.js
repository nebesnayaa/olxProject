import { Router } from "express";
import { AdminController } from "../controllers/admin-controller.js";
export const adminRoutes = Router();
adminRoutes
    .route("/users")
    .get(AdminController.getAllUsers);
adminRoutes
    .route("/advert/:id")
    .put(AdminController.updateAdvertStatus);
adminRoutes
    .route("/user")
    .post(AdminController.createUser);
adminRoutes
    .route("/user/:id")
    .put(AdminController.updateUser);
