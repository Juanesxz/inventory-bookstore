import app from "./app.js";
import "./config/database.js";

//extraccion de variables de entorno
const { PORT } = process.env

//iniciamos el servidor con el puerto correspondiente
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})