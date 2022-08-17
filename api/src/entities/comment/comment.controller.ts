import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CurrentUserId } from 'src/core/decorators/user.dacorator';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { User } from '../user/entities/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(new JwtAuthGuard)
  @Post('create')
  async create(@Body() createCommentDto: CreateCommentDto, @CurrentUserId() userId: User) {
    return await this.commentService.create(createCommentDto, userId);
  }

  @Get('list')
  async findAll() {
    return await this.commentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.commentService.findOne(id);
  }

  @UseGuards(new JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return await this.commentService.update(id, updateCommentDto);
  }

  @UseGuards(new JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.commentService.remove(id);
  }
}
