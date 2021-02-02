import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    category: { type: String, required: true },
});

export interface Category extends mongoose.Document {
    category: string
}