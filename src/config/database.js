import { connect } from "mongoose";


//funcion autoejecutable de la conexion de la base de datos
(async () => {
  try {
    const db = await connect(process.env.DB_CNN);
    console.log("Database connected", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
