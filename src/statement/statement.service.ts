import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Statement } from "./statement.model";

@Injectable()
export class StatementService {

    constructor(
        @InjectModel('Statement') private readonly statementModel: Model<Statement>,
    ) { }

    async getStatements() {
        const statements = await this.statementModel
            .find()
            .populate("User_id", "name image")
            .populate("Category_ids", "category")
            .populate({
                path: "Argument_ids",
                select: "createdAt isPro argument", populate: { path: "User_id Vote_id", select: "name votes" }
            })
            .exec();
        return statements.map(statement => ({
            id: statement.id,
            createdAt: statement.createdAt,
            updatedAt: statement.updatedAt,
            statement: statement.statement,
            favorite: statement.favorite,
            Category_ids: statement.Category_ids,
            User_id: statement.User_id,
            Argument_ids: statement.Argument_ids
        }));
    }

    async getSingleStatement(statementId: string) {
        const statement = await this.findStatement(statementId);
        return {
            id: statement.id,
            createdAt: statement.createdAt,
            updatedAt: statement.updatedAt,
            statement: statement.statement,
            favorite: statement.favorite,
            User_id: statement.User_id,
            Argument_ids: statement.Argument_ids,
        };
    }

    async insertStatement(statement: string, favorite: boolean, Category_ids: string[], User_id: string) {
        const createdAt = new Date;
        const argumentIds = [];
        const newStatement = new this.statementModel({
            createdAt,
            statement,
            favorite,
            Category_ids,
            User_id,
            argumentIds
        });
        const result = await newStatement.save();
        return result.id as string;
    }

    async addArgumentId(argumentId: string, statementId: string) {
        const updatedStatement = await this.findStatement(statementId);
        updatedStatement.Argument_ids.push(argumentId)
        updatedStatement.save();
    }

    async updateStatement(
        statementId: string,
        statementText: string,
        favorite: boolean,
    ) {
        const updatedStatement = await this.findStatement(statementId);
        if (statementText) {
            updatedStatement.statement = statementText;
        }
        if (favorite) {
            updatedStatement.favorite = favorite;
        }
        updatedStatement.updatedAt = new Date;
        updatedStatement.save();
    }

    async deleteStatement(statementId: string) {
        const result = await this.statementModel.deleteOne({ _id: statementId }).exec();
        if (result.n === 0) {
            throw new HttpException('Could not find statement.', 404);
        }
    }

    private async findStatement(id: string): Promise<Statement> {
        let statement;
        try {
            statement = await this.statementModel.findById(id).populate("User_id", "name image").exec();
        } catch (error) {
            throw new HttpException('Could not find statement.', 404);
        }
        if (!statement) {
            throw new HttpException('Could not find statement.', 404);
        }
        return statement;
    }
}
