import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  createdAt: { type: Date },
  comment: { type: String, required: true },
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  Argument_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Argument'
  }
});

export interface Comment extends mongoose.Document {
  id: string;
  createdAt: Date,
  comment: string;
  User_id: string;
  Argument_id: string;
}