import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, ParseIntPipe } from '@nestjs/common';
import { TravelService } from './travel.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CurrentUserId } from 'src/core/decorators/user.dacorator';
import { User } from '../user/entities/user.entity';

@Controller()
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Get('list')
  async findAll(){
    return await this.travelService.findAll();
  }

  @UseGuards(new JwtAuthGuard)
  @Post('create')
  async create(@Body() createTravelDto: CreateTravelDto, @CurrentUserId() userId : User) {
    return await this.travelService.create(createTravelDto, userId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log('test')
    return await this.travelService.findOne(id);
  }

  @UseGuards(new JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTravelDto: UpdateTravelDto) {
    return await this.travelService.update(id, updateTravelDto);
  }

  // @UseGuards(new JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.travelService.remove(id);
  }
}
