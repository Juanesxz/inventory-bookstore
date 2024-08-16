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


    const getCategories = async () => {
        const categories = await categoryServices.getCategories();
        const tbody = $("#tbody");

        tbody.html(
            categories.map((category) => {
                return `
                <tr>
                    <td>${category.name}</td>
                    <td>
                        <button class="edit" data-id="${category._id}">Editar</button>
                        <button class="delete" id="delete" data-id="${category._id}">Eliminar</button>
                    </td>
                </tr>
                `;
            })
        );
    };
    getCategories();

    const createandeditCategories = async (e) => {
        e.preventDefault();
        const categories = {
            name: $("#name").val(),
        };

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
        resetForm();
        getCategories(); // Refrescamos la lista actual de libros
    };

    const deleteCategories = async (e) => {
        e.preventDefault();
        const id = $(e.target).data("id");
        await categoryServices.deleteCategory(id);
        getCategories(); // Refrescamos la lista actual de libros
    };

    const editingCategory = async (e) => {
        e.preventDefault();
        const categoriesId = $(e.target).data("id");
        const categories = await categoryServices.getCategory(categoriesId);
        console.log(categories);

        $("#name").val(categories.name);

        editingCategoryId = categoriesId;
        console.log(editingCategoryId);

        $("#create").text("Actualizar").attr("id", "edit");

        modal.showModal();
    };


    $("#create").on("click", createandeditCategories);
    $(document).on("click", ".delete", deleteCategories);
    $(document).on("click", ".edit", editingCategory);

})