import genderModel from "../models/genderModel.js";


export const getGenders = async (req, res) => {
    const genders = await genderModel.find();
    res.send(genders);
}
export const createGender = async (req, res) => {
    try {
        const gender = new genderModel(req.body);
        const newGender = await gender.save();
        console.log(newGender);
        res.send(newGender);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating gender");
    }
}

export const editGender = async (req, res) => {
    try {
        const { id } = req.params;
        const gender = await genderModel.findByIdAndUpdate(id, req.body);
        console.log(gender);
        res.send(gender);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error editing gender");
    }
}

export const deleteGender = async (req, res) => {
    try {
        const { id } = req.params;
        const gender = await genderModel.findByIdAndDelete(id);
        console.log(gender);
        res.send(gender);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting gender");
    }
}