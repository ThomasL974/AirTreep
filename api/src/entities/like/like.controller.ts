import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CurrentUserId } from 'src/core/decorators/user.dacorator';
import { User } from '../user/entities/user.entity';

@Controller()
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(new JwtAuthGuard)
  @Post('create')
  async create(@Body() createLikeDto: CreateLikeDto, @CurrentUserId() userId: User) {
    return await this.likeService.create(createLikeDto, userId);
  }

  @Get()
  async findAll() {
    return await this.likeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.likeService.findOne(id);
  }

  @UseGuards(new JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.likeService.remove(id);
  }
}
