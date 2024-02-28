import mongoose, { Document, Schema } from "mongoose";
import { IShirt } from "./shirt";
import { IOrder } from "./order";

export interface ISeller extends Document {
    _id: string,
    username: string,
    email: string,
    shirts: IShirt[],
    orders: IOrder[],
    createdAt?: Date,
}

const schema = new mongoose.Schema<ISeller>({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: [true, "A seller must have a name"],
        minlength: [1, "Seller name cannot be empty."],
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
    shirts: [{type: Schema.Types.ObjectId, ref: "Shirt"}],
    orders: [{type: Schema.Types.ObjectId, ref: "Order"}],
    createdAt: {
        type: Date,
        immutable: true,
    }
});

schema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }

    next();
})

export const User = mongoose.model('User', schema);
