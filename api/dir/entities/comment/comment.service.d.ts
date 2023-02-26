import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
export declare class CommentService {
    private commentsRepository;
    constructor(commentsRepository: Repository<Comment>);
    create(createCommentDto: CreateCommentDto, userId: any): Promise<{
        message: string;
    }>;
    findAll(): Promise<Comment[]>;
    findOne(id: string): Promise<Comment[]>;
    update(id: string, updateCommentDto: UpdateCommentDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
