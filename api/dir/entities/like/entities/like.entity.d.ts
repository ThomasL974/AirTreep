import { Travel } from "src/entities/travel/entities/travel.entity";
import { User } from "src/entities/user/entities/user.entity";
export declare class Like {
    id: string;
    liked: boolean;
    user: User;
    travel: Travel;
}
