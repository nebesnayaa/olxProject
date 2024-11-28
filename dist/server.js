import express from "express";
import exphbs, { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import path from "node:path";
import multer from "multer";
import { connection } from "./config/config.js";
import { userRoutes } from "./routes/user-routes.js";
import siteRoutes from "./routes/site-routes.js";
import { UserController } from "./controllers/user-controller.js";
import { categoryRoutes } from "./routes/category-routes.js";
import { advertRoutes } from "./routes/advert-routes.js";
import { photoRoutes } from "./routes/photo-routes.js";
import { messageRoutes } from "./routes/message-routes.js";
const PORT = process.env.PORT || 3000;
const upload = multer();
const run = async () => {
    await connection.sync();
    console.log("DB connection successful");
    // await clientRedis.connect();
    // console.log("Redis connection successful");
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
    app.engine("hbs", engine({
        extname: '.hbs',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true, // Дозволяємо доступ до властивостей прототипу
        },
    }));
    app.set("view engine", "hbs");
    app.set("views", path.join("src", "views"));
    //#endregion
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(upload.none());
    app.use(siteRoutes);
    app.use("/user", userRoutes);
    app.use("/category", categoryRoutes);
    app.use("/advert", advertRoutes);
    app.use("/photo", photoRoutes);
    app.use("/message", messageRoutes);
    app.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}`));
};
try {
    run();
}
catch (error) {
    console.error(error);
}
// connection.sync()
// .then(()=>{
//   //#region options for hbs
//   const hbs = exphbs.create({
//     defaultLayout: "main",
//     extname: "hbs",
//   });
//   //#endregion
//   const app = express();
//   app.use(express.static("photos"));
//   app.use(cookieParser());
//   app.use(UserController.checkUser);
//   //#region handlebars
//   app.use(express.static("public"));
//   app.engine("hbs", engine({
//     extname: '.hbs',
//     runtimeOptions: {
//       allowProtoPropertiesByDefault: true, // Дозволяємо доступ до властивостей прототипу
//     },
//   }));
//   app.set("view engine", "hbs");
//   app.set("views", path.join("src", "views"));
//   //#endregion
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));
//   app.use(upload.none());
//   app.use(siteRoutes);
//   app.use("/user", userRoutes);
//   app.use("/category", categoryRoutes);
//   app.use("/advert", advertRoutes);
//   app.use("/photo", photoRoutes);
//   app.use("/message", messageRoutes);
//   app.listen(PORT, () =>
//     console.log(`Server is running http://localhost:${PORT}`)
//   );
// })
// .catch(err=>{
//   console.error(err);
// });
