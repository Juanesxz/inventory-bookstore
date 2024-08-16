import { Router } from "express";
import { createCategory, deleteCategory, editCategory, getCategories, getCategory } from "../controllers/categoriesController.js";

//instancia del Router para las rutas
const router = Router();

// endpoints para la obtencion de datos de generos
router.get("/", getCategories);
// endpoints para la obtencion de datos de un genero
router.get("/:id", getCategory);
// endpoints para la creacion de generos
router.post("/save", createCategory);
// endpoints para la actualizacion de generos
router.post("/edit/:id", editCategory);
// endpoints para la eliminacion de generos
router.post("/delete/:id", deleteCategory);

export default router;