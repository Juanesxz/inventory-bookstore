import express from "express";
import BookRoutes from "./routes/book.routes.js";
import CategoryRoutes from "./routes/category.routes.js";
import morgan from "morgan";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from 'url';

// Obtenemos el path del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Instaciamos express
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));


// Archivos estaticos
app.use(express.static(path.join(__dirname, "./public")));


// Rutas

app.use("/api/books", BookRoutes);
app.use("/api/category", CategoryRoutes);



export default app;