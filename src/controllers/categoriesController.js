import categoriesModel from "../models/categoryModel.js";


// Funcion para obtener todas las categorías
export const getCategories = async (req, res) => {
    const { page, limit } = req.query; // Definir valores predeterminados para la página y el límite
    try {
        let categories = categoriesModel.find();
        const options = {
            page: parseInt(page), // Página actual
            limit: parseInt(limit), // Número de documentos por página
        };
        const result = await categoriesModel.paginate(categories, options);
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send("Error getting categories");
    }

}

// Funcion para crear una nueva categoría
export const createCategory = async (req, res) => {
    try {
        const category = new categoriesModel(req.body);
        const newCategory = await category.save();
        res.send(newCategory);
    } catch (error) {
        res.status(500).send("Error creating category");
    }
}

// Funcion para obtener una categoría
export const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await categoriesModel.findById(id);
        if (!book) {
            return res.status(404).send("Libro no encontrado");
        }
        res.send(book);
    } catch (error) {
        res.status(500).send("Error en el servidor");
    }
};

// Funcion para editar una categoría
export const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoriesModel.findByIdAndUpdate(id, req.body);
        res.send(category);
    } catch (error) {
        res.status(500).send("Error editing category");
    }
}

// Funcion para borrar una categoría
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoriesModel.findByIdAndDelete(id);
        res.status(200).json("Category deleted");
    } catch (error) {
        res.status(500).send("Error deleting category");
    }
}