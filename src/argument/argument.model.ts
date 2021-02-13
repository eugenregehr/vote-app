import * as mongoose from 'mongoose';

export const ArgumentSchema = new mongoose.Schema({
  createdAt: { type: Date },
  isPro: { type: Boolean, required: true },
  argument: { type: String, required: true },
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  Vote_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vote' },
  Comment_ids: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
  }],
  Statement_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Statement'
  }
});

export interface Argument extends mongoose.Document {
  id: string;
  createdAt: Date,
  isPro: boolean,
  argument: string;
  User_id: string;
  Vote_id: string,
  Comment_ids: string[],
  Statement_id: string
}