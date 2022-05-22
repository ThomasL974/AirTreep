import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PictureService } from './picture.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CurrentUserId } from 'src/core/decorators/user.dacorator';
import { User } from '../user/entities/user.entity';

@Controller()
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @UseGuards(new JwtAuthGuard)
  @Post('create')
  async create(@Body() createPictureDto: CreatePictureDto, @CurrentUserId() userId: User) {
    return await this.pictureService.create(createPictureDto, userId);
  }

  @Get('list')
  async findAll() {
    return await this.pictureService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.pictureService.findOne(id);
  }

  @UseGuards(new JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePictureDto: UpdatePictureDto) {
    return await this.pictureService.update(id, updatePictureDto);
  }

  @UseGuards(new JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.pictureService.remove(id);
  }
}
