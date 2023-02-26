import { Comment } from "src/entities/comment/entities/comment.entity";
import { FavouritesTravel } from "src/entities/favourites-travel/entities/favourites-travel.entity";
import { Like } from "src/entities/like/entities/like.entity";
import { Picture } from "src/entities/picture/entities/picture.entity";
import { Travel } from "src/entities/travel/entities/travel.entity";
export declare class User {
    id: string;
    email: string;
    password: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    description: string;
    birthday: string;
    profilImg: string;
    pseudo: string;
    comments: Comment[];
    likes: Like[];
    travels: Travel[];
    favourites: FavouritesTravel[];
    pictures: Picture[];
}
