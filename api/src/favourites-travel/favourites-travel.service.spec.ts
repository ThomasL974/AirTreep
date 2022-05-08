import { Test, TestingModule } from '@nestjs/testing';
import { FavouritesTravelService } from './favourites-travel.service';

describe('FavouritesTravelService', () => {
  let service: FavouritesTravelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavouritesTravelService],
    }).compile();

    service = module.get<FavouritesTravelService>(FavouritesTravelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
