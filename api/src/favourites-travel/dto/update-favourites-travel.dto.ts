import { PartialType } from '@nestjs/mapped-types';
import { CreateFavouritesTravelDto } from './create-favourites-travel.dto';

export class UpdateFavouritesTravelDto extends PartialType(CreateFavouritesTravelDto) {}
