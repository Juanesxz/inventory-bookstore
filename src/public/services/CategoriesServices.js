
export default class CategoriesServices {
    constructor() {
        this.URL = "http://localhost:4000/api/category";
    }



    async getCategories(page = 1, limit = 10) {
        try {
            const response = await $.ajax({
                type: "GET",
                url: `${this.URL}?page=${page}&limit=${limit}`,
                dataType: "json",
            });
            return response;
        } catch (error) {
            return {
                error: error,
            }
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
            return {
                error: error,
            }
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
            return {
                error: error
            }
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
            return {
                error: error
            }
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
            return response;
        } catch (error) {
            return error
        }
    }




}
