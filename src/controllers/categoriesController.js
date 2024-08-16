import categoriesModel from "../models/categoryModel.js";


export const getCategories = async (req, res) => {
    const categories = await categoriesModel.find();
    res.send(categories);
}
export const createCategory = async (req, res) => {
    try {
        const category = new categoriesModel(req.body);
        const newCategory = await category.save();
        console.log(newCategory);
        res.send(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating category");
    }
}

export const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await categoriesModel.findById(id);
        if (!book) {
            return res.status(404).send("Libro no encontrado");
        }
        res.send(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error en el servidor");
    }
};

export const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoriesModel.findByIdAndUpdate(id, req.body);
        console.log(category);
        res.send(category);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error editing category");
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoriesModel.findByIdAndDelete(id);
        res.status(200).json("Category deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting category");
    }
}