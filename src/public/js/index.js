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

    // Variables para controlar la paginación de libros en general
    let currentPageBooks = 1;
    let totalPagesBooks = 1;

    // Variables para controlar la paginación de libros activos
    let currentPageBooksActive = 1;
    let totalPagesBooksActive = 1;

    let editingBookId = null;

    const getBooks = async (page = 1) => {
        try {
            const books = await bookServices.getBooks(page);
            totalPagesBooks = books.totalPages;

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
                <button class="changestatus" data-id="${book._id}">Estado</button>
                </td>
            </tr>
            `;
                })
            );
            $("#pageactBooks").val(page);
            $("#inicio").text(`${currentPageBooks}`);
            $("#final").text(`${totalPagesBooks}`);
        } catch (error) {
            alert(error);
        }

    };

    const getBooksActive = async (page = 1) => {
        try {
            const books = await bookServices.getBooksActive(page);
            totalPagesBooksActive = books.totalPages;

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
                        <h4>${book.gender?.name}</h4>
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
            $("#inicioa").text(`${currentPageBooksActive}`);
            $("#finala").text(`${totalPagesBooksActive}`);
        } catch (error) {
            alert(error);
        }

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
        try {
            const categories = await categoryServices.getCategories();
            $("#gender").html(
                categories.docs.map((category) => {
                    return `
            <option value="${category._id}">${category?.name}</option>
            `;
                })
            );
        } catch (error) {
            alert(error);
        }
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

        if (!book.title || !book.author || !book.gender || !book.price || !book.stock) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            if (editingBookId) {
                await bookServices.updateBook(editingBookId, book);
                resetForm();
                editingBookId = null;
                $("#edit").text("Guardar").attr("id", "create");
                modal.close();
            } else {
                await bookServices.createBook(book);
                modal.close();
            }
        } catch (error) {
            console.error(error);
        }
        resetForm();
        getBooks(currentPageBooks); // Refrescamos la lista actual de libros
    };

    const deleteBook = async (e) => {
        e.preventDefault();
        const bookId = $(e.target).data("id");
        const confirmation = confirm("¿Seguro que quieres borrar este libro?");
        if (!confirmation) return;

        try {
            await bookServices.deleteBook(bookId);
            getBooks(currentPageBooks);
        } catch (error) {
            console.error(error);
        }
    };

    const editBook = async (e) => {
        e.preventDefault();
        const bookId = $(e.target).data("id");

        try {
            const book = await bookServices.getBook(bookId);
            $("#title").val(book.title);
            $("#author").val(book.author);
            $("#gender").val(book.gender?._id);
            $("#price").val(book.price);
            $("#stock").val(book.stock);
            editingBookId = bookId;
            $("#create").text("Actualizar").attr("id", "edit");

            modal.showModal();
        } catch (error) {
            console.error(error);
        }


    };

    $("#pageactBooks").on("change", () => {
        if ($("#pageactBooks").val() >= totalPagesBooks) {
            $("#pageactBooks").val(totalPagesBooks);
            currentPageBooks = $("#pageactBooks").val();
            $("#inicio").text(`${currentPageBooks}`);;
        } else if ($("#pageactBooks").val() <= 1) {
            $("#pageactBooks").val(1);
            currentPageBooks = $("#pageactBooks").val();
            $("#fin").text(`${currentPageBooks}`);
        }
        getBooks($("#pageactBooks").val());
    });


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

    //eventos click y change para la paginacion activa

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

    $("#pageactBooksActive").on("change", () => {
        if ($("#pageactBooksActive").val() >= totalPagesBooksActive) {
            $("#pageactBooksActive").val(totalPagesBooksActive);
            currentPageBooksActive = $("#pageactBooksActive").val()
            $("#inicio").text(`${currentPageBooksActive}`);;
        } else if ($("#pageactBooksActive").val() <= 1) {
            $("#pageactBooksActive").val(1);
            currentPageBooksActive = $("#pageactBooksActive").val()
            $("#fin").text(`${currentPageBooksActive}`);;
        }
        getBooksActive($("#pageactBooksActive").val());
    });

    getBooks(currentPageBooks);
    getBooksActive(currentPageBooksActive);

    const updateStatus = async (e) => {
        e.preventDefault();
        const bookId = $(e.target).data("id");
        console.log(bookId);

        try {
            await bookServices.updateStatusBook(bookId);
            getBooks(currentPageBooks);
        } catch (error) {
            console.error(error);
        }
    };

    $("#create").on("click", createandeditBook);
    $(document).on("click", ".delete", deleteBook);
    $(document).on("click", ".edit", editBook);
    $(document).on("click", ".changestatus", updateStatus);

});
