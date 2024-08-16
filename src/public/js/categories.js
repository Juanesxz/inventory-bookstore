import CategoriesServices from "../services/CategoriesServices.js";


$(document).ready(() => {
    //instancia de los servicios de libros y categorias
    const categoryServices = new CategoriesServices();

    let btnAbrirModal = document.querySelector("#btn-abrir-modal");
    let btnCerrarModal = document.querySelector("#btn-cerrar-modal");
    let modal = document.querySelector("#modal");

    let editingCategoryId = null;

    const resetForm = () => {
        $("#name").val("");
        editingCategoryId = null;
        $("#edit").text("Guardar").attr("id", "create");
    };


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

    const createandeditCategories = async (e) => {
        e.preventDefault();
        const categories = {
            name: $("#name").val(),
        };

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

    getCategories(currentPageCategories);

    $("#create").on("click", createandeditCategories);
    $(document).on("click", ".delete", deleteCategories);
    $(document).on("click", ".edit", editingCategory);

})