import { Router } from "express";
import { AdvertController } from "../controllers/advert-controller.js";
import { MessageController } from "../controllers/message-controller.js";
export const advertRoutes = Router();
advertRoutes
    .route("/")
    .get(AdvertController.readAll)
    .post(AdvertController.createAdvert);
advertRoutes
    .route("/:id")
    .get(AdvertController.readById)
    .put(AdvertController.updateAdvert)
    .delete(AdvertController.deleteCategory);
advertRoutes
    .route("/:id/messages")
    .get(MessageController.readAllByAdId);
