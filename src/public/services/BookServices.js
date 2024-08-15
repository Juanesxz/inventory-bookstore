// public/js/BookServices.js

export default class BookServices {
    constructor() {
        this.URL = "http://localhost:4000/api/books";
    }

    async getBooks(page = 1, limit = 10) {
        try {
            const response = await $.ajax({
                type: "GET",
                url: `${this.URL}?page=${page}&limit=${limit}`,
                dataType: "json",
            });
            return response;
        } catch (error) {
            console.log("Error al obtener los libros:", error);
        }
    }

        async getBooksActive(page = 1, limit = 2) {
        try {
            const response = await $.ajax({
                type: "GET",
                url: `${this.URL}?page=${page}&limit=${limit}&status=true`,
                dataType: "json",
            });
            return response;
        } catch (error) {
            console.log("Error al obtener los libros:", error);
        }
    }

    async createBook(book) {
        try {
            const response = await $.ajax({
                type: "POST",
                url: `${this.URL}/save`,
                data: JSON.stringify(book),
                contentType: "application/json",
                dataType: "json",
            });
            console.log(book);

            return response;
        } catch (error) {
            console.log("Error al crear el libro:", error);
        }
    }

    async deleteBook(id) {
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
}
