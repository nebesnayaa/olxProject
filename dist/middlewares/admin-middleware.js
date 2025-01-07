import { User } from "../models/user-model.js";
export const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user?.id; // Передбачається, що ID користувача додається в middleware авторизації.
        const user = await User.findByPk(userId);
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Доступ заборонено: лише для адміністратора" });
        }
        next();
    }
    catch (error) {
        console.error("Error in isAdmin middleware:", error);
        return res.status(500).json({ message: "Внутрішня помилка сервера" });
    }
};
