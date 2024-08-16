import axios from 'axios';

// Define tus categorías
const categories = [
    { name: 'Ficción' },
    { name: 'Ciencia' },
    { name: 'Historia' },
    { name: 'Tecnología' },
    { name: 'Filosofía' },
    { name: 'Autoayuda' },
    { name: 'Misterio' },
    { name: 'Novela' },
    { name: 'Cuentos' },
    { name: 'Ciegos' },
    { name: 'Día a dia' },
    { name: 'Romance' },
    { name: 'Música' },
    { name: 'Crimen' },
    { name: 'Comedia' },
    { name: 'Terror' },
];

// Función para guardar categorías por defecto
const saveCategories = async () => {
    try {
        for (const category of categories) {
            const response = await axios.post('http://localhost:4000/api/category/save', category);
            console.log(`Categoría ${category.name} guardada:`, response.data);
        }
        console.log('Todas las categorías se han guardado correctamente.');
    } catch (error) {
        console.error('Error guardando las categorías:', error);
    }
};

// Ejecutar la función para guardar las categorías
saveCategories();
