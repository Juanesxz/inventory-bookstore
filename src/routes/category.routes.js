import { Router } from "express";
import { createCategory, deleteCategory, editCategory, getCategories, getCategory } from "../controllers/categoriesController.js";

//instancia del Router para las rutas
const router = Router();

// endpoints para la obtencion de datos de generos
router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/save", createCategory);
router.post("/edit/:id", editCategory);
router.post("/delete/:id", deleteCategory);

export default router;