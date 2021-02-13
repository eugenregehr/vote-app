import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StatementController } from './statement.controller';
import { StatementService } from './statement.service';
import { StatementSchema } from "./statement.model";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Statement", schema: StatementSchema }])],
  controllers: [StatementController],
  providers: [StatementService],
  exports: [StatementService]
})
export class StatementModule { }
