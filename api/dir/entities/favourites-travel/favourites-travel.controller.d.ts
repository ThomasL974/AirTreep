import { FavouritesTravelService } from './favourites-travel.service';
import { CreateFavouritesTravelDto } from './dto/create-favourites-travel.dto';
import { UpdateFavouritesTravelDto } from './dto/update-favourites-travel.dto';
export declare class FavouritesTravelController {
    private readonly favouritesTravelService;
    constructor(favouritesTravelService: FavouritesTravelService);
    create(createFavouritesTravelDto: CreateFavouritesTravelDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFavouritesTravelDto: UpdateFavouritesTravelDto): string;
    remove(id: string): string;
}
