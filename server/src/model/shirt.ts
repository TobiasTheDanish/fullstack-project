import mongoose, { CallbackError, Document, Schema } from "mongoose";
import { IUser } from "./user";
import { IClub } from "./club";
import { IBid } from "./bid";

export type ShirtCondition = "New" | "Used" | "Damaged"

export interface IShirt extends Document {
    _id: string,
    title: string,
    description: string,
    condition: ShirtCondition,
    year: string,
    club?: IClub,
    seller?: IUser,
    playerName: string,
    playerNumber: number,
    bids: IBid[],
    activeBids: IBid[],
    price: number,
    minPrice: number,
    createdAt?: Date,
}

const schema = new mongoose.Schema<IShirt>({
    title: {
        type: String,
        required: [true, "A shirt must have a name"],
        minlength: [1, "Shirt name cannot be empty."],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    condition: {
        type: String,
        required: [true, "A shirt must have a condition"],
    },
    year: {
        type: String,
        required: [true, "A shirt must have a year"],
    },
    club: {type: Schema.Types.ObjectId, ref: "Club", required: true},
    seller: {type: Schema.Types.ObjectId, ref: "User", required: true},
    playerName: {
        type: String,
        trim: true,
    },
    playerNumber: {
        type: Number,
    },
    price: {
        type: Number,
        required: [true, "A shirt must have a price"],
        min: [1, "Price cannot be 0 or less"],
    },
    minPrice: {
        type: Number,
        min: [1, "minPrice cannot be 0 or less"],
    },
    createdAt: {
        type: Date,
        immutable: [true, "Cannot change createdAt"],
    },
});

schema.virtual('bids', {
    ref: "Bid",
    localField: '_id',
    foreignField: 'shirt',
});

schema.virtual('activeBids', {
    ref: "Bid",
    localField: '_id',
    foreignField: 'shirt',
    match: { declined: false, expiryDate: {$gte: Date.now()} },
});

schema.pre('save', function(next) {
    if (this.isNew && !this.createdAt) {
        this.createdAt = new Date();
    }

    next();
})

schema.post('save', async function(_doc, next) {
    try {
        const sellerId = this.seller;
        const shirtId = this._id;

        if (sellerId && shirtId) {
            const seller = await mongoose.model('User').findById(sellerId);
            seller.populate('shirts');

            if (seller) {
                seller.shirts.push(shirtId);
                await seller.save();
            }
        }

        next();
    } catch (error) {
        next(error as CallbackError);
    }
})

export const Shirt = mongoose.model("Shirt", schema);
