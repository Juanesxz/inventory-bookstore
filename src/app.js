import express from "express";
import BookRoutes from "./routes/book.routes.js";
import GenderRoutes from "./routes/gender.routes.js";
import morgan from "morgan";
import "dotenv/config";

// Instaciamos express
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));



// Rutas

app.use("/book", BookRoutes);
app.use("/gender", GenderRoutes);



export default app;