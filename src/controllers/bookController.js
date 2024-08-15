import bookModel from "../models/bookModel.js";

//funcion para obtener todos los libros
export const getBooks = async (req, res) => {
    try { 
        const books = await bookModel.find().populate("gender", "name");
        res.status(200).send(books);
    } catch (error) {
        res.status(401).send(`${error.message}`);
    }
}

//funcion para crear un nuevo libro
export const createBook = async (req, res) => {
    try {
        const book = new bookModel(req.body);
        const newBook = await book.save();
        console.log(newBook);
        res.status(200).send(newBook);
    } catch (error) {
        console.error(error.message);
        res.status(401).send(`${error.message}`);
    }
}

//funcion para actualizar un libro
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        await bookModel.findByIdAndUpdate(id, req.body);
        console.log(req.body);
        res.status(200).send("Book updated");
    } catch (error) {
        console.error(error.message);
        res.status(401).send(`${error.message}`);
    }
}


//funcion para borrar un libro
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        await bookModel.findByIdAndDelete(id);
        res.send("Book deleted");
    } catch (error) {
        console.error(error.message);
        res.status(500).send(`${error.message}`);
    }
}

export const updateBookStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await bookModel.findById(id);
        book.status = !book.status;
        await book.save();
        res.send("Book status updated");
    } catch (error) {
        console.error(error.message);
        res.status(500).send(`${error.message}`);
    }
}