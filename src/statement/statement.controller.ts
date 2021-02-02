import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StatementService } from "./statement.service";


@Controller('statements')
export class StatementController {
    constructor(private statementService: StatementService) { }

    @Get()
    async getStatements() {
        const statements = await this.statementService.getStatements();
        return statements;
    }

    @Get(':id')
    getSingleStatement(@Param('id') id: string) {
        return this.statementService.getSingleStatement(id);
    }

    @Post()
    async postStatement(
        @Body('statement') statement: string,
        @Body('favorite') favorite: boolean,
        @Body('Category_ids') Category_ids: string[],
        @Body('User_id') User_id: string,
    ) {
        const generatedId = await this.statementService.insertStatement(
            statement,
            favorite,
            Category_ids,
            User_id,
        )
        return { id: generatedId }
    }

    @Delete(':id')
    async deleteStatement(@Param('id') id: string) {
        await this.statementService.deleteStatement(id);
        return null;
    }

    @Patch(':id')
    async updateStatement(
        @Param('id') id: string,
        @Body('statement') statement: string,
        @Body('favorite') favorite: boolean,
    ) {
        await this.statementService.updateStatement(id, statement, favorite);
        return null
    }


}
