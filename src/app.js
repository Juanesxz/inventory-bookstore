import express from "express";
import BookRoutes from "./routes/book.routes.js";
import CategoryRoutes from "./routes/category.routes.js";
import morgan from "morgan";
import "dotenv/config";

// Instaciamos express
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));



// Rutas

app.use("/api/book", BookRoutes);
app.use("/api/category", CategoryRoutes);



export default app;