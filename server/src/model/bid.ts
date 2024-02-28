import mongoose, { CallbackError, Document } from 'mongoose';
import { IShirt } from './shirt';
import { Schema } from 'mongoose';
import { IUser } from './user';

export interface IBid extends Document {
    _id: Schema.Types.ObjectId,
    owner?: IUser,
    shirt?: IShirt,
    amount: number,
    expiryDate: Date,
    accepted: boolean,
    declined: boolean,
    createdAt?: Date,
}

const schema = new mongoose.Schema<IBid>({
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    shirt: {type: Schema.Types.ObjectId, ref: 'Shirt'},
    amount: {
        type: Number,
        required: [true, "Bids must have an amount"],
        min: [0, "Bids cannot be negative"],
    },
    expiryDate: {
        type: Date,
        required: [true, "A bid must have an expiry date"],
    },
    accepted: {
        type: Boolean,
        default: false,
    },
    declined: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        immutable: [true, "Cannot change createdAt"],
    }
});

schema.pre('find', function() {
    this.populate('owner');
    this.populate('shirt');
});

schema.post('save', async function(doc, next) {
    try {
        const bidId = this._id;
        const ownerId = this.owner;

        if (ownerId && bidId) {
            const owner = await mongoose.model('User').findById(ownerId);

            if (owner) {
                owner.placedBids.push(bidId);
                await owner.save();
            }
        }

        await doc.populate('owner');
        await doc.populate('shirt');

        next();
    } catch (error) {
        next(error as CallbackError);
    }
})

export const Bid = mongoose.model('Bid', schema);
