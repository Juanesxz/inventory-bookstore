
export default class CategoriesServices {
    constructor() {
        this.URL = "http://localhost:4000/api/category";
    }



    async getCategories() {
        try {
            const response = await $.ajax({
                type: "GET",
                url: this.URL,
                dataType: "json",
            });
            return response;
        } catch (error) {
            console.log("Error al obtener las categorias:", error);
        }
    }


    async getCategory(id) {
        try {
            const response = await $.ajax({
                type: "GET",
                url: `${this.URL}/${id}`,
                dataType: "json",
            });
            return response;
        } catch (error) {
            console.log("Error al obtener la categoria:", error);
        }
    }

    async createCategory(category) {
        try {
            const response = await $.ajax({
                type: "POST",
                url: `${this.URL}/save`,
                data: JSON.stringify(category),
                contentType: "application/json",
                dataType: "json",
            });
            return response;
        } catch (error) {
            console.log("Error al crear la categoria:", error);
        }
    }

    async deleteCategory(id) {
        try {
            const response = await $.ajax({
                type: "POST",
                url: `${this.URL}/delete/${id}`,
                contentType: "application/json",
                dataType: "json",
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async updateCategory(id, book) {
        try {
            const response = await $.ajax({
                type: "POST",
                url: `${this.URL}/edit/${id}`,
                data: JSON.stringify(book),
                dataType: "json",
                contentType: "application/json",
            });
            console.log(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }




}
