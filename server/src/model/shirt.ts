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
    seller: {type: Schema.Types.ObjectId, ref: "user", required: true},
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
    match: { declined: false },
});

schema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }

    next();
})

schema.pre('find', async function (next) {
    await this.populate('seller');
    await this.populate('club');
    await this.populate('bids');

    next();
});

schema.post('save', async function(doc, next) {
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

        await doc.populate('seller');
        await doc.populate('club');
        await doc.populate('bids');

        next();
    } catch (error) {
        next(error as CallbackError);
    }
})

export const Shirt = mongoose.model("Shirt", schema);
