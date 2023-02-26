import { Travel } from "src/entities/travel/entities/travel.entity";
import { User } from "src/entities/user/entities/user.entity";
export declare class Picture {
    id: string;
    fileName: string;
    createdAt: string;
    travel: Travel;
    user: User;
}
