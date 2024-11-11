import express from "express";
import exphbs from "express-handlebars";
import cookieParser from "cookie-parser";
import path from "node:path";
import multer from "multer";
import { connection } from "./config/config.js";
import { userRoutes } from "./routes/user-routes.js";
import siteRoutes from "./routes/site-routes.js";
import { UserController } from "./controllers/user-controller.js";

const PORT = process.env.PORT || 3000;
const upload = multer();

connection.sync()
.then(()=>{
  //#region options for hbs
  const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
  });
  //#endregion

  const app = express();
  app.use(express.static("photos"));
  app.use(cookieParser());

  app.use(UserController.checkUser);

  //#region handlebars
  app.use(express.static("public"));
  app.engine("hbs", hbs.engine);
  app.set("view engine", "hbs");
  app.set("views", path.join("src", "views"));
  //#endregion

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(upload.none());
  
  app.use(siteRoutes);
  app.use("/user", userRoutes);

  app.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}`)
  );
})
.catch(err=>{
  console.error(err);
});

