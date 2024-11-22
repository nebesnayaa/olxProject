import { Router} from "express";
import { UserController } from "../controllers/user-controller.js";

export const userRoutes = Router();
 
userRoutes.route("/")
  .get(UserController.readAll);

userRoutes
  .route("/register")
  .get((req, res) => res.render("./user-forms/form_registration"))
  .post(UserController.register);

userRoutes
  .route("/login")
  .get((req, res) => res.render("./user-forms/form_authentication"))
  .post(UserController.login);

userRoutes
  .get("/logout", UserController.logout);

userRoutes
  .route("/forgot-password")
  .get((req, res) => res.render("./user-forms/form_sendEmail"))
  .post(UserController.sendResetEmail);

userRoutes
  .route("/password-reset")
  .get((req, res) => res.render("./user-forms/form_resetPassword"))
  .post(UserController.resetPassword);

userRoutes
  .route("/:id")
  .get(UserController.readById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);



