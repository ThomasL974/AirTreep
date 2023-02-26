import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';
export declare class LikeService {
    private likesRepository;
    constructor(likesRepository: Repository<Like>);
    create(createLikeDto: CreateLikeDto, userId: User): Promise<{
        message: string;
    }>;
    findAll(): Promise<Like[]>;
    findOne(id: string): Promise<Like[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
