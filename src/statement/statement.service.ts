import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// import { STATEMENTS } from "./statement.mock";
import { Statement } from "./statement.model";

@Injectable()
export class StatementService {
    // private statements: Statement[] = STATEMENTS;

    constructor(
        @InjectModel('Statement') private readonly statementModel: Model<Statement>,
    ) { }

    async getStatements() {
        const statements = await this.statementModel.find().exec();
        return statements.map(statement => ({
            id: statement.id,
            statement: statement.statement,
            categoryId: statement.categoryId,
            favorite: statement.favorite,
        }));
    }

    async getSingleStatement(statementId: string) {
        const statement = await this.findStatement(statementId);
        return {
            id: statement.id,
            statement: statement.statement,
            categoryId: statement.categoryId,
            favorite: statement.favorite,
        };
    }

    async insertStatement(statement: string, categoryId: number, favorite: boolean) {
        const newStatement = new this.statementModel({
            statement,
            categoryId,
            favorite,
        });
        const result = await newStatement.save();
        return result.id as string;
    }

    async deleteStatement(statementId: string) {
        const result = await this.statementModel.deleteOne({ _id: statementId }).exec();
        if (result.n === 0) {
            throw new HttpException('Could not find statement.', 404);
        }
    }

    async updateStatement(
        statementId: string,
        statementText: string,
        categoryId: number,
        favorite: boolean,
    ) {
        const updatedStatement = await this.findStatement(statementId);
        if (statementText) {
            updatedStatement.statement = statementText;
        }
        if (categoryId) {
            updatedStatement.categoryId = categoryId;
        }
        if (favorite) {
            updatedStatement.favorite = favorite;
        }
        updatedStatement.save();
    }

    private async findStatement(id: string): Promise<Statement> {
        let statement;
        try {
            statement = await this.statementModel.findById(id).exec();
        } catch (error) {
            throw new HttpException('Could not find statement.', 404);
        }
        if (!statement) {
            throw new HttpException('Could not find statement.', 404);
        }
        return statement;
    }
}
