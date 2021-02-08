import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comment } from "./comment.model";

@Injectable()
export class CommentService {

  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) { }

  async getComments() {
    const comments = await this.commentModel.find().populate("User_id", "name image").exec();
    return comments.map(comment => ({
      id: comment.id,
      createdAt: comment.createdAt,
      comment: comment.comment,
      User_id: comment.User_id
    }));
  }

  async getSingleComment(commentId: string) {
    const comment = await this.findComment(commentId);
    return {
      id: comment.id,
      createdAt: comment.createdAt,
      comment: comment.comment,
      User_id: comment.User_id
    };
  }

  async insertComment(comment: string, User_id: string) {
    const createdAt = new Date;
    const newComment = new this.commentModel({
      createdAt,
      comment,
      User_id,
    });
    const result = await newComment.save();
    return result.id as string;
  }

  async deleteComment(commentId: string) {
    const result = await this.commentModel.deleteOne({ _id: commentId }).exec();
    if (result.n === 0) {
      throw new HttpException('Could not find comment.', 404);
    }
  }

  private async findComment(id: string): Promise<Comment> {
    let comment;
    try {
      comment = await this.commentModel.findById(id).populate("User_id", "name image").exec();
    } catch (error) {
      throw new HttpException('Could not find comment.', 404);
    }
    if (!comment) {
      throw new HttpException('Could not find comment.', 404);
    }
    return comment;
  }


}
