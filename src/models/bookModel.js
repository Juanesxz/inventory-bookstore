import mongoose, { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


//Creacion del esquema del modelo libro

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: mongoose.Schema.ObjectId,
        ref: "Categories",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

// Utilizar plugin de paginacion
bookSchema.plugin(mongoosePaginate);
//Exportacion del modelo de libros
export default model("Book", bookSchema);