import { Schema, model } from "mongoose";




const genderSchema = new Schema({
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



export default model("Gender", genderSchema)