import { Module } from '@nestjs/common';
import { StatementModule } from './statement/statement.module';
import { UserModule } from './user/user.module';

import { MongooseModule } from "@nestjs/mongoose";
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { VoteModule } from './vote/vote.module';
import { ArgumentModule } from './argument/argument.module';
import mongodb from "./mongodb";

@Module({
  imports: [
    StatementModule,
    ArgumentModule,
    UserModule,
    CategoryModule,
    CommentModule,
    VoteModule,
    MongooseModule.forRoot(mongodb.config)
  ]
})
export class AppModule { }
