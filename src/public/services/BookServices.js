// Servicio de libros
export default class BookServices {
    constructor() {
        // URL de los correspondiente al endpoint de libros
        this.URL = "http://localhost:4000/api/books";
    }

    // Metodo para obtener todos los libros
    async getBooks(page = 1, limit = 10) {
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
            };
        }
    }

    // Metodo para obtener un libro
    async getBook(id) {
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

    // Metodo para obtener los libros activos
    async getBooksActive(page = 1, limit = 10) {
        try {
            const response = await $.ajax({
                type: "GET",
                url: `${this.URL}?page=${page}&limit=${limit}&status=true`,
                dataType: "json",
            });
            return response;
        } catch (error) {
            return {
                error: error,
            };
        }
    }

    // Metodo para crear un libro
    async createBook(book) {
        try {
            const response = await $.ajax({
                type: "POST",
                url: `${this.URL}/save`,
                data: JSON.stringify(book),
                contentType: "application/json",
                dataType: "json",
            });
            return response;
        } catch (error) {
            return {
                error: error,
            }
        }
    }

    // Metodo para borrar un libro
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
            return {
                error: error,
            }
        }
    }

    // Metodo para editar un libro
    async updateBook(id, book) {
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
            return {
                error: error,
            }
        }
    }


    // Metodo para cambiar el estado de un libro
    async updateStatusBook(id) {
        try {
            const response = await $.ajax({
                type: "POST",
                url: `${this.URL}/status/${id}`,
                dataType: "json",
                contentType: "application/json",
            });
            return response;
        } catch (error) {
            return {
                error: error,
            }
        }
    }
}
