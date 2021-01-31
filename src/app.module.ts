import { Module } from '@nestjs/common';
import { StatementModule } from './statement/statement.module';

import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [StatementModule, MongooseModule.forRoot('mongodb+srv://eugen:EufInkQHmhYrey15@cluster0.rlgev.mongodb.net/nestjs-voteapp?retryWrites=true&w=majority')]
})
export class AppModule { }
