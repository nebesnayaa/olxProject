import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";
export const userRoutes = Router();
userRoutes.route("/")
    .get(UserController.readAll);
userRoutes
    .route("/register")
    .get((req, res) => res.render("form_registration"))
    .post(UserController.register);
userRoutes
    .route("/login")
    .get((req, res) => res.render("form_authentication"))
    .post(UserController.login);
userRoutes
    .get("/logout", UserController.logout);
