import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    UserId: {
        type: Number
    },
    Card: {
        type: String,
        required: true
    }
});

export default mongoose.model(
    "Cards",
    CardSchema
);
