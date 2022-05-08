import { Module } from '@nestjs/common';
import { FavouritesTravelService } from './favourites-travel.service';
import { FavouritesTravelController } from './favourites-travel.controller';

@Module({
  controllers: [FavouritesTravelController],
  providers: [FavouritesTravelService]
})
export class FavouritesTravelModule {}
