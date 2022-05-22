import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserAccountDto, TokenResponseDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() CreateUserAccountDto: CreateUserAccountDto): Promise<TokenResponseDTO> {
    return this.userService.login(CreateUserAccountDto);
  }

  @Post('register')
  register(@Body() CreateUserAccountDto: CreateUserAccountDto){
    return this.userService.register(CreateUserAccountDto);
  }
}
