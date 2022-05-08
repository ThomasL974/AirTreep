import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavouritesTravelService } from './favourites-travel.service';
import { CreateFavouritesTravelDto } from './dto/create-favourites-travel.dto';
import { UpdateFavouritesTravelDto } from './dto/update-favourites-travel.dto';

@Controller('favourites-travel')
export class FavouritesTravelController {
  constructor(private readonly favouritesTravelService: FavouritesTravelService) {}

  @Post()
  create(@Body() createFavouritesTravelDto: CreateFavouritesTravelDto) {
    return this.favouritesTravelService.create(createFavouritesTravelDto);
  }

  @Get()
  findAll() {
    return this.favouritesTravelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favouritesTravelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavouritesTravelDto: UpdateFavouritesTravelDto) {
    return this.favouritesTravelService.update(+id, updateFavouritesTravelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favouritesTravelService.remove(+id);
  }
}
