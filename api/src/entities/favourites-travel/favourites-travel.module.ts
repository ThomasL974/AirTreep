import { Module } from '@nestjs/common';
import { FavouritesTravelService } from './favourites-travel.service';
import { FavouritesTravelController } from './favourites-travel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesTravel } from './entities/favourites-travel.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([FavouritesTravel])
  ],
  controllers: [FavouritesTravelController],
  providers: [FavouritesTravelService]
})
export class FavouritesTravelModule {}
