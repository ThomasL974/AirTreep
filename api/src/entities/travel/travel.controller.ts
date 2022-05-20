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
  create(@Body() createTravelDto: CreateTravelDto, @CurrentUserId() userId : User) {
    return this.travelService.create(createTravelDto, userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log('test')
    return this.travelService.findOne(id);
  }

  @UseGuards(new JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTravelDto: UpdateTravelDto) {
    return this.travelService.update(id, updateTravelDto);
  }

  @UseGuards(new JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.travelService.remove(id);
  }
}
