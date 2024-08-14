import { Router } from "express";
import { createBook, getBooks, updateBook } from "../controllers/bookController.js";



const router = Router();


router.get("/",  getBooks);
router.post("/save",  createBook);
router.post("/edit",  updateBook);



export default router;