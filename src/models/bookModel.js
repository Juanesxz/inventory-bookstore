import mongoose, { Schema, model } from "mongoose";


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
        ref: "Gender",
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
},
    {
        timestamps: true,
        versionKey: false
    }
);


export default model("Book", bookSchema);