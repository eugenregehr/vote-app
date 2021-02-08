import * as mongoose from 'mongoose';

export const VoteSchema = new mongoose.Schema({
  votes: { type: Number },
  User_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  Argument_id: { type: String, required: true }
});

export interface Vote extends mongoose.Document {
  id: string;
  votes: number;
  User_id: string[];
  Argument_id: string;
}