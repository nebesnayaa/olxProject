import { Message } from "../models/message-model.js";
export class MessageController {
    static async readAllByAdId(req, res) {
        try {
            const { id } = req.params;
            const messages = await Message.findAll({
                where: { ad_id: id }
            });
            if (messages) {
                return res.status(200).json({ message: "List of messages of advert " + id, data: messages });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Помилка отримання повідомлень", data: null });
        }
    }
    static async readById(req, res) {
        try {
            const { id } = req.params;
            const message = await Message.findByPk(id);
            if (!message) {
                return res.status(404).json({ message: "Повідомлення не знайдено" });
            }
            return res.status(200).json({ message: "Повідомлення знайдено", data: message });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Помилка отримання повідомлення" });
        }
    }
    static async createMessage(req, res) {
        try {
            const { content, ad_id, sender_id, receiver_id } = req.body;
            // const advert = await Advertisement.findOne({ where: { id: ad_id } });
            // const receiver_id = advert?.user_id;
            const newMessage = await Message.create({ content, ad_id, sender_id, receiver_id });
            return res.status(201).json({ message: "Повідомлення створено", data: newMessage });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Помилка створення повідомлення" });
        }
    }
    static async updateMessage(req, res) {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const message = await Message.findByPk(id);
            if (!message) {
                return res.status(404).json({ message: "Повідомлення не знайдено" });
            }
            message.content = content || message.content;
            message.timestamp = new Date();
            await message.save();
            return res.status(200).json({ message: "Повідомлення оновлено", data: message });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Помилка оновлення повідомлення" });
        }
    }
    static async deleteMessage(req, res) {
        try {
            const { id } = req.params;
            const message = await Message.findByPk(id);
            if (!message) {
                return res.status(404).json({ message: "Повідомлення не знайдено" });
            }
            await message.destroy();
            return res.status(200).json({ message: "Повідомлення видалено" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Помилка видалення повідомлення" });
        }
    }
}
