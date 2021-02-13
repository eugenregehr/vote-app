import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentService } from "./comment.service";


@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) { }

  @Get()
  async getComments() {
    const comments = await this.commentService.getComments();
    return comments;
  }

  @Get(':id')
  getSingleComment(@Param('id') id: string) {
    return this.commentService.getSingleComment(id);
  }

  @Post()
  async postComment(
    @Body('comment') comment: string,
    @Body('User_id') User_id: string,
    @Body('Argument_id') Argument_id: string,
  ) {
    const generatedId = await this.commentService.insertComment(
      comment,
      User_id,
      Argument_id
    )
    return { id: generatedId }
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    await this.commentService.deleteComment(id);
    return null;
  }

}
