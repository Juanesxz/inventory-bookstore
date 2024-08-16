import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


//Creacion del esquema del modelo Categoria

const categoriesSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)


categoriesSchema.plugin(mongoosePaginate);


export default model("Categories", categoriesSchema)