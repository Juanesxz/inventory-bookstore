import bookModel from "../models/bookModel.js";
import categoriesModel from "../models/categoryModel.js";

//funcion para obtener todos los libros
export const getBooks = async (req, res) => {
    try {
        const { status, page ,limit} = req.query; // Definir valores predeterminados para la página y el límite
        // Construir la consulta base
        let query = bookModel.find()
        // Aplicar el filtro si `status` está definido
        if (status !== undefined) {
            query = query.where("status").equals(status === "true");
        }
        const options = {
        page: parseInt(page), // Página actual
        limit: parseInt(limit), // Número de documentos por página
        populate: {
            path: "gender",
            select: "name",
        }
        };
        // Ejecutar la consulta con paginación
        const result = await bookModel.paginate(query, options);
        res.status(200).send(result);
    } catch (error) {
        res.status(401).send(`${error.message}`);
    }
}

export const getBookGender = async (req, res) => {
    try {
        const { name } = req.params;
        // Buscar el género por nombre
        const gender = await categoriesModel.findOne({ name: name});
        if (!gender) {
            return res.status(404).send("Género no encontrado");
        }
        // Buscar libros por ID de género
        const books = await bookModel.find({ gender: gender._id }).populate("gender", "name");
        
        if (books.length === 0) {
            return res.status(404).send("No se encontraron libros para el género especificado");
        }

        res.send(books);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error en el servidor");
    }
};


//funcion para crear un nuevo libro
export const createBook = async (req, res) => {
    try {
        const book = new bookModel(req.body);
        const newBook = await book.save();
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