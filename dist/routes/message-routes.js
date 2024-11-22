import { Router } from "express";
import { MessageController } from "../controllers/message-controller.js";
export const messageRoutes = Router();
messageRoutes
    .route("/")
    .post(MessageController.createMessage);
messageRoutes
    .route("/:id")
    .get(MessageController.readById)
    .put(MessageController.updateMessage)
    .delete(MessageController.deleteMessage);
