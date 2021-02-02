import { IsString, IsNumber, IsBoolean, IsNotEmpty } from "class-validator";
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
});

export interface User extends mongoose.Document {
    id: string;
    name: string;
    image: string;
}