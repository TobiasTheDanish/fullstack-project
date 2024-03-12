import mongoose, { Document, Schema } from 'mongoose';
import { IShirt } from './shirt';
import { ILeague } from './league';

export interface IClub extends Document {
    _id: string,
    name: string,
    league: ILeague,
    shirts: IShirt[],
    createdAt?: Date,
}

const schema = new mongoose.Schema<IClub>({
    name: {
        type: String,
        required: [true, "A club must have a name"],
        minlength: [1, "Club name cannot be empty."],
        trim: true,
        unique: true,
    },
    league: {type: Schema.Types.ObjectId, ref: 'League'},
    createdAt: {
        type: Date,
        immutable: [true, "Cannot change createdAt"],
    },
});

schema.virtual('shirts', {
    ref: 'Shirt',
    localField: '_id',
    foreignField: 'club',
});

// populate on find
schema.pre('find', function() {
    this.populate('league');
});

schema.post('save', function(doc, next) {
    doc.populate('league').then(function() {
        next();
    });
});

schema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }

    next();
})

export const Club = mongoose.model("Club", schema);
