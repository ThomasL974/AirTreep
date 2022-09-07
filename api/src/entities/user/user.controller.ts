import { Controller, Get, Post, Body, UseGuards, UseInterceptors, ClassSerializerInterceptor, ValidationPipe, HttpCode, UsePipes, Patch, Request, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserAccountDto, TokenResponseDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CurrentUserId } from 'src/core/decorators/user.dacorator';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../picture/picture.controller';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  login(@Body() CreateUserAccountDto: CreateUserAccountDto): Promise<TokenResponseDTO> {
    return this.userService.login(CreateUserAccountDto);
  }

  @Post('register')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  register(@Body() CreateUserAccountDto: CreateUserAccountDto) {
    return this.userService.register(CreateUserAccountDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('details')
  async findUserInfo(@CurrentUserId() userId: User) {
    return await this.userService.getOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('update')
  async updateOne(@Body() updateUserDto: UpdateUserDto, @CurrentUserId() user: User) {
    return await this.userService.updateOne(user, updateUserDto, '');
  }

  @UseGuards(new JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {dest: '../app/assets/uploads/profil'}))
  async uploadFile(@CurrentUserId() userId: User, @UploadedFile() file, @Body() updateUserDto: UpdateUserDto) {
    const ext = '.'+file.mimetype.split('/')[1];
    return await this.userService.updateOne(userId, updateUserDto, file.path+ext);
  }
}
