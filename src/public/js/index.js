import BookServices from "../services/BookServices.js";
import CategoriesServices from "../services/CategoriesServices.js";

$(document).ready(() => {
    //instancia de los servicios de libros y categorias
    const bookServices = new BookServices();
    const categoryServices = new CategoriesServices();


    const btnAbrirModal = document.querySelector("#btn-abrir-modal");
    const btnCerrarModal = document.querySelector("#btn-cerrar-modal");
    const modal = document.querySelector("#modal");

    if (btnAbrirModal && btnCerrarModal && modal) {

        btnAbrirModal.addEventListener("click", () => {
            modal.showModal();
        });

        btnCerrarModal.addEventListener("click", () => {
            modal.close();
            editingBookId = null;
            resetForm();
        });
    }


    let currentPageBooks = 1;
    let totalPagesBooks = 1;

    let currentPageBooksActive = 1;
    let totalPagesBooksActive = 1;

    let editingBookId = null;

    const getBooks = async (page = 1) => {
        const books = await bookServices.getBooks(page);
        totalPagesBooks = books.totalPages;
        console.log(books);

        const tbody = $("#tbody");
        tbody.html(
            books.docs.map((book, i) => {
                return `
            <tr>
                <td>${i + 1}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.gender?.name}</td>
                <td>${book.price}</td>
                <td>${book.stock}</td>
                <td>${book.status}</td>
                <td>
                <button class="edit" data-id="${book._id}">Editar</button>
                <button class="delete" data-id="${book._id}">Eliminar</button>
                </td>
            </tr>
            `;
            })
        );
        $("#pageactBooks").val(page);
    };

    const getBooksActive = async (page = 1) => {
        const books = await bookServices.getBooksActive(page);
        totalPagesBooksActive = books.totalPages;
        console.log(books);

        const card = $(".card");
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
                </div>`;
            })
        );
        $("#pageactBooksActive").val(page);
    };

    const resetForm = () => {
        $("#title").val("");
        $("#author").val("");
        $("#gender").val("");
        $("#price").val("");
        $("#stock").val("");
        editingBookId = null;
        $("#edit").text("Guardar").attr("id", "create");
    };

    const getCategories = async () => {
        const categories = await categoryServices.getCategories();
        $("#gender").html(
            categories.map((category) => {
                return `
            <option value="${category._id}">${category.name}</option>
            `;
            })
        );
    };

    getCategories();

    const createandeditBook = async (e) => {
        e.preventDefault();
        const book = {
            title: $("#title").val(),
            author: $("#author").val(),
            gender: $("#gender").val(),
            price: $("#price").val(),
            stock: $("#stock").val(),
        };

        if (editingBookId) {
            await bookServices.updateBook(editingBookId, book);
            resetForm();
            editingBookId = null;
            $("#edit").text("Guardar").attr("id", "create");
        } else {
            await bookServices.createBook(book);
            modal.close();
        }
        resetForm();
        getBooks(currentPageBooks); // Refrescamos la lista actual de libros
    };

    const deleteBook = async (e) => {
        e.preventDefault();
        const bookId = $(e.target).data("id");

        await bookServices.deleteBook(bookId);

        getBooks(currentPageBooks);
    };

    const editBook = async (e) => {
        e.preventDefault();
        const bookId = $(e.target).data("id");
        const book = await bookServices.getBook(bookId);

        $("#title").val(book.title);
        $("#author").val(book.author);
        $("#gender").val(book.gender?._id);
        $("#price").val(book.price);
        $("#stock").val(book.stock);

        editingBookId = bookId;
        $("#create").text("Actualizar").attr("id", "edit");

        modal.showModal();
    };

    $("#pageprevBooks").on("click", () => {
        if (currentPageBooks > 1) {
            currentPageBooks--;
            getBooks(currentPageBooks);
        }
    });

    $("#pageafterBooks").on("click", () => {
        if (currentPageBooks < totalPagesBooks) {
            currentPageBooks++;
            getBooks(currentPageBooks);
        }
    });

    $("#pageprevBooksActive").on("click", () => {
        if (currentPageBooksActive > 1) {
            currentPageBooksActive--;
            getBooksActive(currentPageBooksActive);
        }
    });

    $("#pageafterBooksActive").on("click", () => {
        if (currentPageBooksActive < totalPagesBooksActive) {
            currentPageBooksActive++;
            getBooksActive(currentPageBooksActive);
        }
    });

    getBooks(currentPageBooks);
    getBooksActive(currentPageBooksActive);

    $("#create").on("click", createandeditBook);
    $(document).on("click", ".delete", deleteBook);
    $(document).on("click", ".edit", editBook);
});
