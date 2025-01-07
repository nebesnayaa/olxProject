import bcrypt from "bcrypt";
import { TokenController } from "./token-controller.js";
import { User } from "../models/user-model.js";
import { Advertisement } from "../models/advert-model.js";
export class AdminController {
    static async verifyAdmin(req, res, next) {
        try {
            await TokenController.verifyAccessToken(req, res, async () => {
                const user = req.user;
                console.log("User: ", user);
                if (user?.role !== "admin") {
                    return res.status(403).json({ message: "Доступ заборонено. Ви не адміністратор." });
                }
                next();
            });
        }
        catch (error) {
            console.error("Error in verifyAdmin:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async updateAdvertStatus(req, res) {
        try {
            await AdminController.verifyAdmin(req, res, async () => {
                const { id } = req.params;
                const { status } = req.body;
                const advert = await Advertisement.findByPk(id);
                if (!advert) {
                    return res.status(404).json({ message: "Оголошення не знайдено" });
                }
                advert.status = status || advert.status;
                await advert.save();
                return res.status(200).json({ message: "Статус оголошення оновлено", data: advert });
            });
        }
        catch (error) {
            console.error("Error updating advert status:", error);
            return res.status(500).json({ message: "Помилка оновлення статусу оголошення" });
        }
    }
    static async createUser(req, res) {
        try {
            await AdminController.verifyAdmin(req, res, async () => {
                const { login, email, password, role, phone } = req.body;
                const salt = bcrypt.genSaltSync(10);
                const hash = await bcrypt.hash(password, salt);
                const newUser = await User.create({
                    login,
                    email,
                    password: hash,
                    role,
                    phone,
                });
                await TokenController.generateToken(newUser, res);
                return res.status(201).json({ message: "Користувач створений", data: newUser });
            });
        }
        catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({ message: "Помилка створення користувача" });
        }
    }
    static async updateUser(req, res) {
        try {
            await AdminController.verifyAdmin(req, res, async () => {
                const { id } = req.params;
                const { login, password, email, role, phone, status } = req.body;
                const user = await User.findByPk(id);
                if (!user) {
                    return res.status(404).json({ message: "Користувач не знайдений" });
                }
                user.login = login || user.login;
                user.password = password || user.password;
                user.email = email || user.email;
                user.role = role || user.role;
                user.phone = phone || user.phone;
                user.status = status ?? user.status;
                await user.save();
                return res.status(200).json({ message: "Дані користувача оновлено", data: user });
            });
        }
        catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({ message: "Помилка оновлення даних користувача" });
        }
    }
    static async getAllUsers(req, res) {
        try {
            await AdminController.verifyAdmin(req, res, async () => {
                const users = await User.findAll();
                return res.status(200).json({ message: "Список користувачів", data: users });
            });
        }
        catch (error) {
            console.error("Error in getAllUsers:", error);
            res.status(500).json({ message: "Помилка отримання списку користувачів" });
        }
    }
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await AdminController.verifyAdmin(req, res, async () => {
                const user = await User.findByPk(id);
                if (!user) {
                    return res.status(404).json({ message: "Користувача не знайдено" });
                }
                await user.destroy();
                return res.status(200).json({ message: "Користувача видалено" });
            });
        }
        catch (error) {
            console.error("Error in deleteUser:", error);
            res.status(500).json({ message: "Помилка видалення користувача" });
        }
    }
}
