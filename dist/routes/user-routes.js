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
userRoutes
    .route("/forgot-password")
    .get((req, res) => res.render("form_sendEmail"))
    .post(UserController.sendResetEmail);
userRoutes
    .route("/password-reset")
    .get((req, res) => res.render("form_resetPassword"))
    .post(UserController.resetPassword);
// userRoutes.post('/api/password-reset/:token', async (req, res) => {
//   const { token } = req.params;
//   const { newPassword } = req.body;
//   const userId = TokenController.verifyPasswordResetToken(token);
//   if (!userId) {
//       return res.status(400).json({ message: 'Invalid or expired token' });
//   }
//   // Хешування нового паролю і збереження його в базу
//   const hashedPassword = await bcrypt.hash(newPassword, 10);
//   await User.update({ password: hashedPassword }, { where: { id: userId } });
//   res.status(200).json({ message: 'Password successfully updated' });
// });
