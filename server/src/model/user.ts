import mongoose, { Document, Schema } from "mongoose";
import { IShirt } from "./shirt";
import { IBid } from "./bid";

export interface IUser extends Document {
    _id: string,
    username: string,
    email: string,
    password: string,
    shirts: IShirt[],
    placedBids: IBid[],
    createdAt?: Date,
}

const schema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: [true, "A user must have a name"],
        minlength: [1, "User name cannot be empty."],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        validator: function (email: string) {
            return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
        },
        message: (props: {value: string}) => `${props.value} is not a valid email address.`,
    },
    password: {
        type: String,
        required: [true, "A User must have a password"],
    },
    shirts: [{type: Schema.Types.ObjectId, ref: "Shirt"}],
    placedBids: [{type: Schema.Types.ObjectId, ref: "Bid"}],
    createdAt: {
        type: Date,
        immutable: [true, "Cannot change createdAt"],
    }
});

schema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }

    next();
})

export const User = mongoose.model('User', schema);
