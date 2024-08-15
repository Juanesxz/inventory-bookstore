import BookServices from "../services/BookServices.js";
import CategoriesServices from "../services/CategoriesServices.js";



$(document).ready( () => {
    const bookServices = new BookServices();
    const categoryServices = new CategoriesServices();
    
const getBooks = async () => {
    const books = await bookServices.getBooks()
    const tbody =  $("#tbody")
    tbody.html(
        books.docs.map( (book) => {
            return `
            <tr>
                <td>${book._id}</td>
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
            `
        })
    )
}
getBooks()


const getCategories = async () => {
    const categories = await categoryServices.getCategories()
    const select = $("#gender").html(
        categories.map( (category) => {
            return `
            <option value="${category._id}">${category.name}</option>
            `
        })
    )
}


getCategories()



const createBook = async (e) => {
    e.preventDefault()
    const book = {
        title: $("#title").val(),
        author: $("#author").val(),
        gender: $("#gender").val(),
        price: $("#price").val(),
        stock: $("#stock").val(),
    }

    const newBook = await bookServices.createBook(book)
    console.log(newBook);

    getBooks()
}

const deleteBook = async (e) => {
    e.preventDefault()
    const bookId = $(e.target).data("id")

    await bookServices.deleteBook(bookId)

    getBooks()
    
    
}


$("#create").on("click", createBook)

$(document).on("click", ".delete", deleteBook);
})
