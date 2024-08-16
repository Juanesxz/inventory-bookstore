import { Router } from "express";
import { createBook, deleteBook, getBook, getBooks, updateBook, updateBookStatus } from "../controllers/bookController.js";

const router = Router();

// endpoints para la obtencion de datos de libros
router.get("/",  getBooks);
// endpoints para la obtencion de datos de un libro
router.get("/:id",  getBook);
// endpoints para la creacion de libros
router.post("/save",  createBook);
// endpoints para la actualizacion de libros
router.post("/edit/:id",  updateBook);
// endpoints para la eliminacion de libros
router.post("/delete/:id",  deleteBook);
//endpoints para el cambio de estado
router.post("status/:id",  updateBookStatus);
//endpoints para busqueda por genero opcional
//router.get("/:name",  getBookCategory);

export default router;