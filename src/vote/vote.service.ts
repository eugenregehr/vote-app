import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Vote } from "./vote.model";
// import { ArgumentService } from "../argument/argument.service";

@Injectable()
export class VoteService {

  constructor(
    @InjectModel('Vote') private readonly voteModel: Model<Vote>,
    // private readonly argumentService: ArgumentService
  ) { }

  async getVotes() {
    const votes = await this.voteModel.find().populate("User_id", "name image").exec();
    return votes.map(vote => ({
      id: vote.id,
      votes: vote.votes,
      User_id: vote.User_id,
      Argument_id: vote.Argument_id
    }));
  }

  async getSingleVote(voteId: string) {
    const vote = await this.findVote(voteId);
    return {
      id: vote.id,
      votes: vote.votes,
      User_id: vote.User_id,
      Argument_id: vote.Argument_id
    };
  }

  async insertVote(votes: number, User_id: string[], Argument_id: string) {
    const newVote = new this.voteModel({
      votes,
      User_id,
      Argument_id
    });
    const result = await newVote.save();
    // this.argumentService.setVoteId(Argument_id, result.id);
    return result.id as string;
  }

  async deleteVote(voteId: string) {
    const result = await this.voteModel.deleteOne({ _id: voteId }).exec();
    if (result.n === 0) {
      throw new HttpException('Could not find vote.', 404);
    }
  }

  private async findVote(id: string): Promise<Vote> {
    let vote;
    try {
      vote = await this.voteModel.findById(id).populate("User_id", "name image").exec();
    } catch (error) {
      throw new HttpException('Could not find vote.', 404);
    }
    if (!vote) {
      throw new HttpException('Could not find vote.', 404);
    }
    return vote;
  }


}
