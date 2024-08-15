
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




}
