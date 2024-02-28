import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface ILeague extends Document {
    _id: string,
    name: string,
    country: string,
}

const schema = new mongoose.Schema<ILeague>({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, "A league must have a name"],
        minlength: [1, "League name cannot be empty."],
        trim: true,
        unique: true,
    },
    country: {
        type: String,
        required: [true, "A league must have a country"],
        minlength: [1, "League country cannot be empty."],
        trim: true,
    },
});

export const League = mongoose.model('League', schema);
