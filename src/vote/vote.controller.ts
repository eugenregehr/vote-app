import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { VoteService } from "./vote.service";


@Controller('votes')
export class VoteController {
  constructor(private voteService: VoteService) { }

  @Get()
  async getVotes() {
    const votes = await this.voteService.getVotes();
    return votes;
  }

  @Get(':id')
  getSingleVote(@Param('id') id: string) {
    return this.voteService.getSingleVote(id);
  }

  @Post()
  async postVote(
    @Body('like') like: number,
    @Body('User_id') User_id: string[],
    @Body('Argument_id') Argument_id: string,
  ) {
    const generatedId = await this.voteService.insertVote(
      like,
      User_id,
      Argument_id,
    )
    return { id: generatedId }
  }

  @Delete(':id')
  async deleteVote(@Param('id') id: string) {
    await this.voteService.deleteVote(id);
    return null;
  }

}
