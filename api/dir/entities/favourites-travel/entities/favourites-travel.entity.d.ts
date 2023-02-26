import { Travel } from "src/entities/travel/entities/travel.entity";
import { User } from "src/entities/user/entities/user.entity";
export declare class FavouritesTravel {
    id: number;
    favourite: boolean;
    user: User;
    travel: Travel;
}
