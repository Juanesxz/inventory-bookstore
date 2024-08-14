import app from "./app.js";
import "./config/database.js";


const {PORT}  = process.env


app.listen(PORT, () => {
    console.log("Server running on port", PORT);
})