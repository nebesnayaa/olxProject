import { User } from "../models/user-model.js";
export const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user?.id; // Припускаємо, що `req.user` містить id користувача
        if (!userId) {
            return res.status(401).json({ message: "Неавторизований доступ" });
        }
        // Використовуємо scope adminUsers
        const adminUser = await User.scope("adminUsers").findByPk(userId);
        if (!adminUser) {
            return res.status(403).json({ message: "Доступ дозволено тільки адміністратору" });
        }
        next(); // Користувач адміністратор, передаємо управління далі
    }
    catch (error) {
        console.error("Помилка перевірки адміністратора:", error);
        res.status(500).json({ message: "Внутрішня помилка сервера" });
    }
};
