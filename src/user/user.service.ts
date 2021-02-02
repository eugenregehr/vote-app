import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from "./user.model";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) { }

    async getAllUsers() {
        const user = await this.userModel.find().exec();
        return user.map(user => ({
            id: user.id,
            name: user.name,
            image: user.image,
        }));
    }

    async insertUser(name: string, image: string) {
        const newUser = new this.userModel({
            name,
            image,
        });
        const result = await newUser.save();
        return result.id as string;
    }
}
