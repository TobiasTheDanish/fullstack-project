import mongoose, { Document } from 'mongoose';
import { IShirt } from './shirt';
import { Schema } from 'mongoose';
import { IBuyer } from './buyer';

export interface IOrder extends Document {
    _id: Schema.Types.ObjectId,
    buyer?: IBuyer,
    shirts: IShirt[],
    total: number
    createdAt?: Date,
}

const schema = new mongoose.Schema<IOrder>({
    _id: Schema.Types.ObjectId,
    buyer: {type: Schema.Types.ObjectId, ref: 'Buyer', required: true},
    shirts: [{type: Schema.Types.ObjectId, ref: 'Shirt'}],
    createdAt: {
        type: Date,
        immutable: true,
    }
});

schema.virtual('totalPrice').get(function(): number {
    return this.shirts.reduce((acc, curr) => acc + curr.price, 0);
});

schema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }

    next();
})

export const Order = mongoose.model('Order', schema);
