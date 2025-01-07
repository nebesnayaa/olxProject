import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import nodemailer from "nodemailer";
import { Advertisement } from "../models/advert-model.js";
import { Message } from "../models/message-model.js";
import { Token } from "../models/token-model.js";
import { User } from "../models/user-model.js";
import { TokenController } from "./token-controller.js";
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
export class UserController {
    static async checkUser(req, res, next) {
        const token = req.cookies.access_token;
        if (token) {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (!err && decoded) {
                    res.locals.user = decoded.login;
                }
            });
        }
        next();
    }
    static async readAll(req, res) {
        const users = await User.findAll({ include: [Advertisement, Message, Token] });
        if (users) {
            return res.status(200).json({ message: "List of users", data: users });
        }
        return res.status(500).json({ message: "Помилка отримання корстувачів", data: null });
    }
    static async register(req, res) {
        try {
            const { login, email, password, confirm_password, phone } = req.body;
            if (!email || !login || !password || !phone) {
                return res.status(400).json({ message: "All fields are required" });
            }
            if (!validator.isEmail(email)) {
                return res.status(400).send("Incorect email");
            }
            if (!validator.isLength(password, { min: 6 })) {
                return res.status(400).send("Password should have minimum 6 symbols");
            }
            if (password !== confirm_password) {
                return res.status(400).send("Password and confirm password aren't equal");
            }
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).send("Користувач з таким email вже зареєстровано");
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = await bcrypt.hash(password, salt);
            const user = await User.create({
                login,
                email,
                password: hash,
                phone,
            });
            res.locals.user = user.login;
            await TokenController.generateToken(user, res);
            res.status(201).redirect("/");
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user)
                return res.status(400).json({ message: "Юзера з таким email не знайдено" });
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch)
                return res.status(400).json({ message: "Неправильний пароль" });
            await TokenController.generateToken(user, res);
            res.status(200).redirect("/");
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async logout(req, res) {
        res.clearCookie('access_token');
        res.redirect('/');
    }
    static async sendResetEmail(req, res) {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send('Користувача з таким email не знайдено.');
        }
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const resetToken = (await TokenController.generatePasswordResetToken(email)).toString();
        const resetLink = `http://localhost:${PORT}/user/password-reset?token=${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            text: `Перейдіть за цим посиланням, щоб відновити пароль: ${resetLink}`
        };
        await transporter.sendMail(mailOptions);
        res.status(200).send('Посилання для відновлення пароля надіслано на вашу пошту.');
    }
    static async resetPassword(req, res) {
        try {
            const { token } = req.query;
            const { password, confirm_password } = req.body;
            if (!validator.isLength(password, { min: 6 })) {
                return res.status(400).send("Пароль повинен містити мініму 6 символів");
            }
            if (password !== confirm_password) {
                return res.status(400).send("Паролі не співпадають");
            }
            const decoded = jwt.verify(token, JWT_SECRET);
            const email = decoded.email;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).send('Користувача не знайдено.');
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = await bcrypt.hash(password, salt);
            await User.update({
                password: hash
            }, { where: { email: email } });
            res.status(200).redirect("/user/login");
        }
        catch (error) {
            res.status(400).send('Токен недійсний або закінчився.');
        }
    }
    static async readById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, { include: [Advertisement, Message, Token] });
            if (!user) {
                return res.status(404).json({ message: "Користувача не знайдено" });
            }
            return res.status(200).json({ message: "Користувача знайдено", data: user });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Помилка отримання користувача" });
        }
    }
    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { login, email, password, phone } = req.body;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "Користувача не знайдено" });
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = await bcrypt.hash(password, salt);
            user.login = login || user.login;
            user.email = email || user.email;
            user.password = hash || user.password;
            user.phone = phone || user.phone;
            await user.save();
            return res.status(200).json({ message: "Користувача оновлено", data: user });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Помилка оновлення користувача" });
        }
    }
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "Користувача не знайдено" });
            }
            await user.destroy();
            return res.status(200).json({ message: "Користувача видалено" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Помилка видалення користувача" });
        }
    }
}
