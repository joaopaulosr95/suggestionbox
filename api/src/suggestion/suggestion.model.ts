import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

export interface ISuggestion extends mongoose.Document {
    firstName: string,
    lastName: string,
    email: number,
    message: string,
}

export default mongoose.model<ISuggestion>("Suggestion", suggestion);
