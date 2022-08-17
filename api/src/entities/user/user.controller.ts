import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserAccountDto, TokenResponseDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CurrentUserId } from 'src/core/decorators/user.dacorator';
import { User } from './entities/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  login(@Body() CreateUserAccountDto: CreateUserAccountDto): Promise<TokenResponseDTO> {
    return this.userService.login(CreateUserAccountDto);
  }

  @Post('register')
  register(@Body() CreateUserAccountDto: CreateUserAccountDto) {
    return this.userService.register(CreateUserAccountDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('details')
  async findUserInfo(@CurrentUserId() userId: User) {
    return await this.userService.getUserInfo(userId);
  }
}
