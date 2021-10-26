import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
    Login: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

export default mongoose.model(
    "Users",
    UserSchema
);
