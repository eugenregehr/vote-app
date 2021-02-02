import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from "./category.service";


@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @Get()
  async getAllCategory() {
    const category = await this.categoryService.getAllCategory();
    return category;
  }

  @Post()
  async postCategory(
    @Body('category') category: string,
  ) {
    const generatedId = await this.categoryService.insertCategory(
      category,
    )
    return { id: generatedId }
  }
}
