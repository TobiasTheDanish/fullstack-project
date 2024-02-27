import mongoose, { CallbackError, Document, Schema } from "mongoose";
import { ISeller } from "./seller";
import { IClub } from "./club";

export interface IShirt extends Document {
    _id: string,
    name: string,
    club?: IClub,
    seller?: ISeller,
    playerName: string,
    number: number,
    price: number,
    createdAt?: Date,
}

const schema = new mongoose.Schema<IShirt>({
    name: {
        type: String,
        required: [true, "A shirt must have a name"],
        minlength: [1, "Shirt name cannot be empty."],
        trim: true,
    },
    club: {type: Schema.Types.ObjectId, ref: "Club", required: true},
    seller: {type: Schema.Types.ObjectId, ref: "Seller", required: true},
    playerName: {
        type: String,
        trim: true,
    },
    number: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
    },
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

schema.post('save', async function(_doc, next) {
    try {
        const sellerId = this.seller;
        const shirtId = this._id;
        const clubId = this.club;

        if (sellerId && clubId && shirtId) {
            const seller = await mongoose.model('Seller').findById(sellerId);
            const club = await mongoose.model('Club').findById(clubId);

            if (seller) {
                seller.shirts.push(shirtId);
                await seller.save();
            }
            if (club) {
                club.shirts.push(shirtId);
                await club.save();
            }
        }

        next();
    } catch (error) {
        next(error as CallbackError);
    }
})

export const Shirt = mongoose.model("Shirt", schema);
