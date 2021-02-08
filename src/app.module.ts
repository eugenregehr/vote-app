import { Module } from '@nestjs/common';
import { StatementModule } from './statement/statement.module';
import { UserModule } from './user/user.module';

import { MongooseModule } from "@nestjs/mongoose";
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { VoteModule } from './vote/vote.module';
import { ArgumentModule } from './argument/argument.module';

@Module({
  imports: [
    StatementModule,
    ArgumentModule,
    UserModule,
    CategoryModule,
    CommentModule,
    VoteModule,
    MongooseModule.forRoot('mongodb+srv://eugen:EufInkQHmhYrey15@cluster0.rlgev.mongodb.net/nestjs-voteapp?retryWrites=true&w=majority')
  ]
})
export class AppModule { }
