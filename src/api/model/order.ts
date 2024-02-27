import mongoose, { CallbackError, Document } from 'mongoose';
import { IShirt } from './shirt';
import { Schema } from 'mongoose';
import { IBuyer } from './buyer';

export interface IOrder extends Document {
    _id: Schema.Types.ObjectId,
    buyer?: IBuyer,
    shirts: IShirt[],
    totalPrice: number
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

schema.pre('find', function() {
    this.populate('shirts');
});

schema.post('save', function(doc, next) {
    doc.populate('shirts').then(function() {
        next();
    });
});

schema.virtual('totalPrice').get(function(): number {
    try {
        return this.shirts.reduce((acc, curr) => {
            return acc + curr.price;
        }, 0);
    } catch (e) {
        console.error("Error in 'order' virtual 'totalPrice'", e);
        return 0;
    }
});

schema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }

    next();
})

schema.post('save', async function(_doc, next) {
    try {
        const orderId = this._id;
        const buyerId = this.buyer;

        if (buyerId && orderId) {
            const buyer = await mongoose.model('Buyer').findById(buyerId);

            if (buyer) {
                buyer.orders.push(orderId);
                await buyer.save();
            }
        }

        next();
    } catch (error) {
        next(error as CallbackError);
    }
})

export const Order = mongoose.model('Order', schema);
