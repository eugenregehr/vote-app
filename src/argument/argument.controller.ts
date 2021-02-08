import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ArgumentService } from "./argument.service";


@Controller('arguments')
export class ArgumentController {
  constructor(private argumentService: ArgumentService) { }

  @Get()
  async getArguments() {
    const argues = await this.argumentService.getArguments();
    return argues;
  }

  @Get(':id')
  getSingleArgument(@Param('id') id: string) {
    return this.argumentService.getSingleArgument(id);
  }

  @Post()
  async postArgument(
    @Body('isPro') isPro: boolean,
    @Body('argument') argument: string,
    @Body('User_id') User_id: string,
    @Body('Vote_id') Vote_id: string,
  ) {
    const generatedId = await this.argumentService.insertArgument(
      isPro,
      argument,
      User_id,
      Vote_id
    )
    return { id: generatedId }
  }

  @Patch(':id')
  async setVoteid(
    @Param('id') id: string,
    @Body('Vote_id') Vote_id: string,
  ) {
    await this.argumentService.setVoteId(id, Vote_id);
    return null
  }

  @Delete(':id')
  async deleteArgument(@Param('id') id: string) {
    await this.argumentService.deleteArgument(id);
    return null;
  }

}
