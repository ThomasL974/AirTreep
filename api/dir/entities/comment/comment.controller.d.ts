import { User } from '../user/entities/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(createCommentDto: CreateCommentDto, userId: User): Promise<{
        message: string;
    }>;
    findAll(): Promise<import("./entities/comment.entity").Comment[]>;
    findOne(id: string): Promise<import("./entities/comment.entity").Comment[]>;
    update(id: string, updateCommentDto: UpdateCommentDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
