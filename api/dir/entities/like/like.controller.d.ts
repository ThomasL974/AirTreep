import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { User } from '../user/entities/user.entity';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    create(createLikeDto: CreateLikeDto, userId: User): Promise<{
        message: string;
    }>;
    findAll(): Promise<import("./entities/like.entity").Like[]>;
    findOne(id: string): Promise<import("./entities/like.entity").Like[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
