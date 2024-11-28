import { Router } from "express";
import { AdvertController } from "../controllers/advert-controller.js";
import { MessageController } from "../controllers/message-controller.js";
export const advertRoutes = Router();
advertRoutes
    .route("/")
    .get(AdvertController.readAll)
    .post(AdvertController.createAdvert);
advertRoutes
    .route("/search")
    .get(async (req, res) => {
    try {
        const { query, minPrice, maxPrice } = req.query;
        const advertisements = await AdvertController.search(req, res);
        res.render("partials/advertisements", { advertisements, query, minPrice, maxPrice });
    }
    catch (error) {
        console.error("Error finding adverts:", error);
        res.status(500).send("Помилка при пошуку оголошень");
    }
});
advertRoutes
    .route("/:id")
    .get(AdvertController.readById)
    .put(AdvertController.updateAdvert)
    .delete(AdvertController.deleteCategory);
advertRoutes
    .route("/:id/messages")
    .get(MessageController.readAllByAdId);
