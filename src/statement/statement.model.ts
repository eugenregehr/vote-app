import { IsString, IsNumber, IsBoolean, IsNotEmpty } from "class-validator";
import * as mongoose from 'mongoose';

export const StatementSchema = new mongoose.Schema({
    statement: { type: String, required: true },
    categoryId: { type: Number },
    favorite: { type: Boolean },
});

export interface Statement extends mongoose.Document {
    id: string;
    statement: string;
    categoryId: number;
    favorite: boolean;
}