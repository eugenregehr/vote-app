import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { VoteSchema } from "./vote.model";


@Module({
  imports: [MongooseModule.forFeature([{ name: "Vote", schema: VoteSchema }])],
  controllers: [VoteController],
  providers: [VoteService],
  exports: [VoteService]
})
export class VoteModule { }
