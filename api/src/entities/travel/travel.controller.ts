import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TravelService } from './travel.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CurrentUserId } from 'src/core/decorators/user.dacorator';
import { User } from '../user/entities/user.entity';

@Controller()
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @UseGuards(new JwtAuthGuard)
  @Post('create')
  create(@Body() createTravelDto: CreateTravelDto, @CurrentUserId() userId : User) {
    return this.travelService.create(createTravelDto, userId);
  }

  @Get()
  findAll() {
    return this.travelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelDto: UpdateTravelDto) {
    return this.travelService.update(+id, updateTravelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelService.remove(+id);
  }
}
