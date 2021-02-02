import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from "./user.service";


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getAllUsers() {
        const users = await this.userService.getAllUsers();
        return users;
    }

    @Post()
    async postUser(
        @Body('name') name: string,
        @Body('image') image: string,
    ) {
        const generatedId = await this.userService.insertUser(
            name,
            image
        )
        return { id: generatedId }
    }
}
