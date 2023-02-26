import { Travel } from "src/entities/travel/entities/travel.entity";
import { User } from "src/entities/user/entities/user.entity";
export declare class Comment {
    id: string;
    description: string;
    createdAt: string;
    editedAt: Date;
    user: User;
    travel: Travel;
}
