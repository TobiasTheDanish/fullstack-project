import mongoose from "mongoose";
import { IClub } from "./club";

export interface ILeague extends Document {
    _id: string,
    name: string,
    country: string,
    imageUrl: string,
    clubs: IClub[],
    createdAt?: Date,
}

const schema = new mongoose.Schema<ILeague>({
    name: {
        type: String,
        required: [true, "A league must have a name"],
        minlength: [1, "League name cannot be empty."],
        trim: true,
        unique: true,
    },
    imageUrl: {
        type: String,
        required: [true, "A League must have an image"],
    },
    country: {
        type: String,
        required: [true, "A league must have a country"],
        minlength: [1, "League country cannot be empty."],
        trim: true,
    },
    createdAt: {
        type: Date,
        immutable: [true, "Cannot change createdAt"],
    },
});

schema.virtual('clubs', {
    ref: 'Club',
    localField: '_id',
    foreignField: 'league',
});

schema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }

    next();
})

export const League = mongoose.model('League', schema);
