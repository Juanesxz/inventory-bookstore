// Importacion del servicio de categorias
import CategoriesServices from "../services/CategoriesServices.js";


$(document).ready(() => {
    //instancia de los servicios de libros y categorias
    const categoryServices = new CategoriesServices();

    // Variables para controlar el modal
    let btnAbrirModal = document.querySelector("#btn-abrir-modal");
    let btnCerrarModal = document.querySelector("#btn-cerrar-modal");
    let modal = document.querySelector("#modal");

    // Variables para controlar la edicion
    let editingCategoryId = null;

    // Funcion para resetear el formulario
    const resetForm = () => {
        $("#name").val("");
        editingCategoryId = null;
        $("#edit").text("Guardar").attr("id", "create");
    };

    // Eventos para el modal
    btnAbrirModal.addEventListener("click", () => {
        modal.showModal();
    });
    btnCerrarModal.addEventListener("click", () => {
        modal.close();
        editingCategoryId = null;
        resetForm();
    });

    // Variables para controlar la paginación de libros en general
    let currentPageCategories = 1;
    let totalPagesCategories = 1;

    // Funcion para obtener todas las categorías y renderizarlas
    const getCategories = async (page = 1) => {
        try {
            const categories = await categoryServices.getCategories(page);
            totalPagesCategories = categories.totalPages;
            const tbody = $("#tbody");
            tbody.html(
                categories.docs.map((category) => {
                    return `
            <tr>
                <td>${category?.name}</td>
                <td>
                    <button class="edit" data-id="${category._id}">Editar</button>
                    <button class="delete" id="delete" data-id="${category._id}">Eliminar</button>
                </td>
            </tr>
            `;
                })
            );

            $("#pageCat").val(page);
            $("#inicio").text(`${currentPageCategories}`);
            $("#final").text(`${totalPagesCategories}`);
        } catch (error) {
            alert(error);
        }
    };

    // Funcion para crear y editar categorías
    const createandeditCategories = async (e) => {
        e.preventDefault();
        const categories = {
            name: $("#name").val(),
        };

        if (!categories.name) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            if (editingCategoryId) {
                await categoryServices.updateCategory(editingCategoryId, categories);
                resetForm();
                editingCategoryId = null;
                $("#edit").text("Guardar").attr("id", "create");
                modal.close();
            } else {
                await categoryServices.createCategory(categories);
                modal.close();
            }

        } catch (error) {
            console.error(error);
        }

        resetForm();
        getCategories(currentPageCategories); // Refrescamos la lista actual de libros
    };


    // Funcion para borrar categorías
    const deleteCategories = async (e) => {
        e.preventDefault();
        const id = $(e.target).data("id");
        const confirmation = confirm("¿Seguro que quieres borrar esta categoría?");
        if (!confirmation) return;
        try {
            await categoryServices.deleteCategory(id);
            getCategories(currentPageCategories); // Refrescamos la lista actual de libros
        } catch (error) {
            console.error(error);
        }
    };


    // Funcion para editar categorías
    const editingCategory = async (e) => {
        e.preventDefault();
        const categoriesId = $(e.target).data("id");

        try {
            const categories = await categoryServices.getCategory(categoriesId);
            $("#name").val(categories.name);
            editingCategoryId = categoriesId;
            $("#create").text("Actualizar").attr("id", "edit");
            modal.showModal();
        } catch (error) {
            console.error(error);

        }
    };


    // Eventos para la paginación incluyendo el en los botones y en el input
    $("#pageprevCat").on("click", () => {
        if (currentPageCategories > 1) {
            currentPageCategories--;
            getCategories(currentPageCategories);
        }
    });

    $("#pageafterCat").on("click", () => {
        if (currentPageCategories < totalPagesCategories) {
            currentPageCategories++;
            getCategories(currentPageCategories);
        }
    });

    $("#pageCat").on("change", () => {
        if ($("#pageCat").val() >= totalPagesCategories) {
            $("#pageCat").val(totalPagesCategories);
            currentPageCategories = $("#pageCat").val();
            $("#inicio").text(`${currentPageCategories}`);
        } else if ($("#pageCat").val() <= 1) {
            $("#pageCat").val(1);
            currentPageCategories = $("#pageCat").val();
            $("#final").text(`${currentPageCategories}`);
        }
        getCategories($("#pageCat").val());
    });

    // Llamamos a la funcion para cargar la primera vez
    getCategories(currentPageCategories);

    // Llamamos a la funcion para crear, borrar y editar categorías
    $("#create").on("click", createandeditCategories);
    $(document).on("click", ".delete", deleteCategories);
    $(document).on("click", ".edit", editingCategory);

})