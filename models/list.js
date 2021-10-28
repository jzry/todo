import mongoose from "mongoose";

const ListsSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Body: {
        type: String,
        required: true
    }
}, {timestamps: true});

export default mongoose.model(
    "Lists",
    ListsSchema
);