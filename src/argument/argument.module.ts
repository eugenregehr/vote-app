import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArgumentController } from './argument.controller';
import { ArgumentService } from './argument.service';
import { ArgumentSchema } from "./argument.model";
import { VoteModule } from "../vote/vote.module";
import { StatementModule } from "../statement/statement.module";


@Module({
  imports: [VoteModule, StatementModule, MongooseModule.forFeature([{ name: "Argument", schema: ArgumentSchema }])],
  controllers: [ArgumentController],
  providers: [ArgumentService],
  exports: [ArgumentService],
})
export class ArgumentModule { }
