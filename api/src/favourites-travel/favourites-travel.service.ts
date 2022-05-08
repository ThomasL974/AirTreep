import { Injectable } from '@nestjs/common';
import { CreateFavouritesTravelDto } from './dto/create-favourites-travel.dto';
import { UpdateFavouritesTravelDto } from './dto/update-favourites-travel.dto';

@Injectable()
export class FavouritesTravelService {
  create(createFavouritesTravelDto: CreateFavouritesTravelDto) {
    return 'This action adds a new favouritesTravel';
  }

  findAll() {
    return `This action returns all favouritesTravel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favouritesTravel`;
  }

  update(id: number, updateFavouritesTravelDto: UpdateFavouritesTravelDto) {
    return `This action updates a #${id} favouritesTravel`;
  }

  remove(id: number) {
    return `This action removes a #${id} favouritesTravel`;
  }
}
