import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';
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
  async findAll(@Query() queries){
    return await this.travelService.findAll(queries);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list/mts')
  async findAllByUserId(@Query() queries, @CurrentUserId() userId : User){
    return await this.travelService.findAllByUserId(userId, queries);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() createTravelDto: CreateTravelDto, @CurrentUserId() userId : User) {
    return await this.travelService.create(createTravelDto, userId);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.travelService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateTravelDto: UpdateTravelDto, @CurrentUserId() userId : User) {
    return await this.travelService.update(id, updateTravelDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string, @CurrentUserId() userId : User) {
    return await this.travelService.remove(id, userId);
  }
}
