import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentSchema } from "./comment.model";
import { ArgumentModule } from "../argument/argument.module"

@Module({
  imports: [ArgumentModule, MongooseModule.forFeature([{ name: "Comment", schema: CommentSchema }])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule { }
