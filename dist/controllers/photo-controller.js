import { Photo } from "../models/photo-model.js";
export class PhotoController {
    static async readAllByAdvertId(req, res) {
        try {
            const { id } = req.params;
            const photos = await Photo.findAll({
                where: { ad_id: id }
            });
            if (photos) {
                return res.status(200).json({ message: "Зображення для оголошення " + id, data: photos });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Помилка отримання зображень", data: null });
        }
    }
    static async createPhoto(req, res) {
        try {
            const { filepath, ad_id } = req.body;
            const newPhoto = await Photo.create({ filepath, ad_id });
            return res.status(201).json({ message: "Зображення додано", data: newPhoto });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Помилка додавання зображення" });
        }
    }
    static async deletePhoto(req, res) {
        try {
            const { id } = req.params;
            const photo = await Photo.findByPk(id);
            if (!photo) {
                return res.status(404).json({ message: "Зображення не знайдено" });
            }
            await photo.destroy();
            return res.status(200).json({ message: "Зображення видалено" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Помилка видалення зображення" });
        }
    }
}
