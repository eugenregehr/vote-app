import { Module } from '@nestjs/common';
import { StatementModule } from './statement/statement.module';
import { UserModule } from './user/user.module';

import { MongooseModule } from "@nestjs/mongoose";
import { CategoryModule } from './category/category.module';

@Module({
  imports: [StatementModule, UserModule, CategoryModule, MongooseModule.forRoot('mongodb+srv://eugen:EufInkQHmhYrey15@cluster0.rlgev.mongodb.net/nestjs-voteapp?retryWrites=true&w=majority')]
})
export class AppModule { }
