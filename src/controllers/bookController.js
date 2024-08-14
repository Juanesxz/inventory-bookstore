import bookModel from "../models/bookModel.js";


export const getBooks = async (req, res) => {
    const books = await bookModel.find();
    res.send(books);
}

export const createBook = async (req, res) => {
try {
    const book = new bookModel(req.body);
    const newBook = await book.save();
    console.log(newBook);
    res.send(newBook);
} catch (error) {
    console.error(error);
    res.status(500).send("Error creating book");
}
}



export const updateBook = async (req, res) => {
    console.log(req.body);
     
    
}