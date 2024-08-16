import categoriesModel from "../models/categoryModel.js";


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
export const createCategory = async (req, res) => {
    try {
        const category = new categoriesModel(req.body);
        const newCategory = await category.save();
        res.send(newCategory);
    } catch (error) {
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
        res.status(500).send("Error en el servidor");
    }
};

export const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoriesModel.findByIdAndUpdate(id, req.body);
        res.send(category);
    } catch (error) {
        res.status(500).send("Error editing category");
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoriesModel.findByIdAndDelete(id);
        res.status(200).json("Category deleted");
    } catch (error) {
        res.status(500).send("Error deleting category");
    }
}