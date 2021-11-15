import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    UserId: {
        type: Number
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Login: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
}, {timestamps: true});



export default mongoose.model(
    "Users",
    UsersSchema
);
