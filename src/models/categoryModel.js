import { Schema, model } from "mongoose";




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



export default model("Categories", categoriesSchema)