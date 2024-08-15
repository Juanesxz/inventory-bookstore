// public/js/BookServices.js

export default class BookServices {
    constructor() {
        this.URL = "http://localhost:4000/api/books";
    }

    async getBooks(page = 1, limit = 50) {
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


}
