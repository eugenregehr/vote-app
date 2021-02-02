import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from "./category.model";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) { }

  async getAllCategory() {
    const category = await this.categoryModel.find().exec();
    return category.map(category => ({
      id: category.id,
      category: category.category
    }));
  }

  async insertCategory(category: string) {
    const newCategory = new this.categoryModel({
      category
    });
    const result = await newCategory.save();
    return result.id as string;
  }
}
