import { HttpException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Argument } from "./argument.model";
import { VoteService } from "../vote/vote.service";
import { StatementService } from "../statement/statement.service";

@Injectable()
export class ArgumentService {

  constructor(
    @InjectModel('Argument') private readonly argumentModel: Model<Argument>,
    private readonly voteService: VoteService,
    private readonly statementService: StatementService,
  ) { }

  async getArguments() {
    const argues = await this.argumentModel.find()
      .populate("User_id", "name image")
      .populate("Vote_id", "votes")
      .populate({ path: "Comment_ids", select: "comment", populate: { path: "User_id", select: "name" } })
      .exec();
    return argues.map(argue => ({
      id: argue.id,
      createdAt: argue.createdAt,
      isPro: argue.isPro,
      argument: argue.argument,
      User_id: argue.User_id,
      Vote_id: argue.Vote_id,
      Comment_ids: argue.Comment_ids,
      Statement_id: argue.Statement_id,
    }));
  }

  async getSingleArgument(argumentId: string) {
    const argue = await this.findArgument(argumentId);
    return {
      id: argue.id,
      createdAt: argue.createdAt,
      isPro: argue.isPro,
      argument: argue.argument,
      User_id: argue.User_id,
      Comment_ids: argue.Comment_ids,
      Statement_id: argue.Statement_id
    };
  }

  async insertArgument(isPro: boolean, argument: string, User_id: string, Vote_id: string, Statement_id: string) {
    const createdAt = new Date;
    const commentIds = []
    const newArgument = new this.argumentModel({
      createdAt,
      isPro,
      argument,
      User_id,
      Vote_id,
      commentIds,
      Statement_id
    });
    const result = await newArgument.save();
    let voteId = await this.voteService.insertVote(0, [], result.id);
    this.setVoteId(result.id, voteId)
    this.statementService.addArgumentId(result.id, Statement_id)
    return result.id as string;
  }

  async setVoteId(
    argumentId: string,
    Vote_id: string,
  ) {
    const argue = await this.findArgument(argumentId);
    if (Vote_id) {
      argue.Vote_id = Vote_id;
    }
    argue.save();
  }

  async addCommentId(
    argumentId: string,
    commentId: string
  ) {
    const argue = await this.findArgument(argumentId);
    if (commentId) {
      argue.Comment_ids.push(commentId);
    }
    argue.save();
  }

  async deleteArgument(argumentId: string) {

    // delete vote document
    const getId = await this.argumentModel.findById(argumentId).exec();
    this.voteService.deleteVote(getId.Vote_id);

    const result = await this.argumentModel.deleteOne({ _id: argumentId }).exec();

    if (result.n === 0) {
      throw new HttpException('Could not find argument.', 404);
    }
  }

  private async findArgument(id: string): Promise<Argument> {
    let argument;
    try {
      argument = await this.argumentModel.findById(id).populate("User_id", "name image").exec();
    } catch (error) {
      throw new HttpException('Could not find argument.', 404);
    }
    if (!argument) {
      throw new HttpException('Could not find argument.', 404);
    }
    return argument;
  }


}
