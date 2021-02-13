import * as mongoose from 'mongoose';

export const StatementSchema = new mongoose.Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    statement: { type: String, required: true },
    favorite: { type: Boolean },
    Category_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }],
    User_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    Argument_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Argument'
    }]
});

export interface Statement extends mongoose.Document {
    id: string;
    createdAt: Date,
    updatedAt: Date,
    statement: string;
    favorite: boolean;
    Category_ids: string[];
    User_id: string;
    Argument_ids: string[];
}