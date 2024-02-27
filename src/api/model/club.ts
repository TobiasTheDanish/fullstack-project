import mongoose, { Document, Schema } from 'mongoose';
import { IShirt } from './shirt';

export interface IClub extends Document {
    _id: string,
    name: string,
    league: string,
    country: string,
    shirts: IShirt[],
    createdAt?: Date,
}

const schema = new mongoose.Schema<IClub>({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, "A club must have a name"],
        minlength: [1, "Club name cannot be empty."],
        trim: true,
        unique: true,
    },
    league: {
        type: String,
        required: [true, "A Club must have a league associated"],
        minlength: [1, "Club league cannot be empty."],
        trim: true,
    },
    country: {
        type: String,
        required: [true, "A club must have a country"],
        minlength: [1, "Club country cannot be empty."],
        trim: true,
    },
    shirts: [
        {type: Schema.Types.ObjectId, ref: 'Shirt'}
    ],
    createdAt: {
        type: Date,
        immutable: true,
    },
});

schema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }

    next();
})

export const Club = mongoose.model("Club", schema);
