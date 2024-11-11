import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { Advertisement } from "../models/ad-model.js";
import { Message } from "../models/message-model.js";
import { Token } from "../models/token-model.js";
import { User } from "../models/user-model.js";
import { TokenController } from "./token-controller.js";
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
        return res.status(500).json({ message: "Db Error", data: null });
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
                return res.status(400).send("User already exists");
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
            console.log(req.body);
            const user = await User.findOne({ where: { email } });
            if (!user)
                return res.status(400).json({ message: "No user was found with this email" });
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch)
                return res.status(400).json({ message: "Invalid password" });
            res.locals.user = user.login;
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
}
