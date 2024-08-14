import { Router } from "express";
import { createGender, deleteGender, editGender, getGenders } from "../controllers/genderController.js";

//instancia del Router para las rutas
const  router = Router();

// endpoints para la obtencion de datos de generos
router.get("/", getGenders);
router.post("/save", createGender);
router.post("/edit/:id", editGender);
router.post("/delete/:id", deleteGender);

export default router;