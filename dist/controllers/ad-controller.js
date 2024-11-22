import { Advertisement } from "../models/ad-model.js";
export class AdController {
    static async createAdvert(req, res) {
        try {
            const { title, description, price } = req.body;
            await Advertisement.create({
                title,
                description,
                price
            });
            res.status(201).redirect("/");
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
