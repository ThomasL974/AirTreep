import { Test, TestingModule } from '@nestjs/testing';
import { FavouritesTravelController } from './favourites-travel.controller';
import { FavouritesTravelService } from './favourites-travel.service';

describe('FavouritesTravelController', () => {
  let controller: FavouritesTravelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavouritesTravelController],
      providers: [FavouritesTravelService],
    }).compile();

    controller = module.get<FavouritesTravelController>(FavouritesTravelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
