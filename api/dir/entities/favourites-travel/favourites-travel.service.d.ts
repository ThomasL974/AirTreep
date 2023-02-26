import { CreateFavouritesTravelDto } from './dto/create-favourites-travel.dto';
import { UpdateFavouritesTravelDto } from './dto/update-favourites-travel.dto';
export declare class FavouritesTravelService {
    create(createFavouritesTravelDto: CreateFavouritesTravelDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFavouritesTravelDto: UpdateFavouritesTravelDto): string;
    remove(id: number): string;
}
