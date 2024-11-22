import { Router} from "express";
import { PhotoController } from "../controllers/photo-controller.js";

export const photoRoutes = Router();

photoRoutes
  .route("/")
  .post(PhotoController.createPhoto);

photoRoutes
  .route("/:id")
  .get(PhotoController.readAllByAdvertId)
  .delete(PhotoController.deletePhoto);