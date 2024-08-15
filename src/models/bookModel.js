import mongoose, { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


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
    status:{
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);


bookSchema.plugin(mongoosePaginate);

export default model("Book", bookSchema);