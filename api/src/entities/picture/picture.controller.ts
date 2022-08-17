import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, StreamableFile, Res } from '@nestjs/common';
import { PictureService } from './picture.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CurrentUserId } from 'src/core/decorators/user.dacorator';
import { User } from '../user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path/posix';
import { Readable } from 'stream';

@Controller()
export class PictureController {
  constructor(private readonly pictureService: PictureService) { }

  @UseGuards(new JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Body() createPictureDto: CreatePictureDto, @CurrentUserId() userId: User, @UploadedFile() file: Express.Multer.File) {
    return await this.pictureService.uploadFile(createPictureDto, userId, file.buffer, file.originalname, file.mimetype);
  }

  @Get('list')
  async findAll() {
    return await this.pictureService.findAll();
  }

  @Get(':id')
  async getFileById(@Param('id') id: string, @Res({ passthrough: true }) response: Response) {
    const file = await this.pictureService.getFileById(id);
    // const stream = Readable.from(file.data);

    // response.set({
    //   'Content-Disposition': `inline; filename="${file.fileName}"`,
    //   'Content-Type': 'image',
    //   'object': file
    // })

    // return new StreamableFile(stream);

    return file
  }

  @UseGuards(new JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePictureDto: UpdatePictureDto) {
    return await this.pictureService.update(id, updatePictureDto);
  }

  @UseGuards(new JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.pictureService.remove(id);
  }
}
