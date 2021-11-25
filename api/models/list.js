import {
    ObjectId
} from "bson";
import mongoose from "mongoose";

const ListsSchema = new mongoose.Schema({
    UserId: {
        type: ObjectId,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Body: {
        type: [{
            Completed: {
                type: Boolean,
                default: false
            },
            Text: {
                type: String,
                required: true
            }
        }],
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model(
    "Lists",
    ListsSchema
);