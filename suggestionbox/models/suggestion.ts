import { model, Schema } from "mongoose";

const suggestion = new Schema({
    firstName: {
        type: String,
        required: [true, "Missing firstName"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Missing lastName"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Missing email"],
        trim: true
    },
    message: {
        type: String,
        required: [true, "Missing message"],
        trim: true
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Suggestion = model("Suggestion", suggestion);

export { Suggestion }
