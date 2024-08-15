import BookServices from "../services/BookServices.js";
import CategoriesServices from "../services/CategoriesServices.js";

$(document).ready(() => {
    const bookServices = new BookServices();
    let currentPage = 1;
    let totalPages = 1;  // Variable para almacenar el número total de páginas
    const categoryServices = new CategoriesServices();

    const getBooks = async (page = 1) => {
        const books = await bookServices.getBooks();
        totalPages = books.totalPages;  // Actualiza el total de páginas
        console.log(books.totalPages);

        const tbody = $("#tbody");
        tbody.html(
            books.docs.map((book, i) => {
                return `
            <tr>
                <td>${i + 1}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.gender.name}</td>
                <td>${book.price}</td>
                <td>${book.stock}</td>
                <td>${book.status}</td>
                <td>
                <a href="./pages/editBook.html?id=${book._id}">Editar</a>
                <a href="#" class="delete" data-id="${book._id}">Eliminar</a>
                </td>
            </tr>
            `;
            })
        );
        $("#pageact").val(page);


    };


    const getBooksActive = async (page = 1) => {
        const books = await bookServices.getBooksActive(page);
        totalPages = books.totalPages;  // Actualiza el total de páginas
        const card = $(".card");
        console.log(books);


        card.html(
            books.docs.map((book) => {
                return `
                <div>
                    <img src="./img/fondo.jpg" alt="">
                    <div>
                        <label for="title">Titulo</label>
                        <h4>${book.title}</h4>
                    </div>
                    <div>
                        <label for="author">Autor</label>
                        <h4>${book.author}</h4>
                    </div>
                    <div>
                        <label for="gender">Genero</label>
                        <h4>${book.gender.name}</h4>
                    </div>
                    <div>
                        <label for="price">Precio</label>
                        <h4>${book.price}</h4>
                    </div>
                    <div>
                        <label for="stock">Stock</label>
                        <h4>${book.stock}</h4>
                    </div>

                    <button>Ver informacion</button>

            </div>`;
            })
        );
    };


    const resetForm = () => {
        $("#title").val("");
        $("#author").val("");
        $("#gender").val("");
        $("#price").val("");
        $("#stock").val("");
    };

    const getCategories = async () => {
        const categories = await categoryServices.getCategories();
        const select = $("#gender").html(
            categories.map((category) => {
                return `
            <option value="${category._id}">${category.name}</option>
            `;
            })
        );
    };

    getCategories();

    const createBook = async (e) => {
        e.preventDefault();
        const book = {
            title: $("#title").val(),
            author: $("#author").val(),
            gender: $("#gender").val(),
            price: $("#price").val(),
            stock: $("#stock").val(),
        };

        await bookServices.createBook(book);
        resetForm();
        getBooks();
    };

    const deleteBook = async (e) => {
        e.preventDefault();
        const bookId = $(e.target).data("id");

        await bookServices.deleteBook(bookId);

        getBooks();
    };

    $("#pageprev").on("click", () => {
        if (currentPage > 1) {
            currentPage--;
            getBooks(currentPage);
            getBooksActive(currentPage);
        }
    });

    $("#pageafter").on("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            getBooks(currentPage);
            getBooksActive(currentPage);
        }
    });

    getBooks();
    getBooksActive();

    $("#create").on("click", createBook);

    $(document).on("click", ".delete", deleteBook);
});
