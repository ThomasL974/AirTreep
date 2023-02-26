import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { Picture } from './entities/picture.entity';
export declare class PictureService {
    private picturesRepository;
    private userService;
    constructor(picturesRepository: Repository<Picture>, userService: UserService);
    uploadFile(createPictureDto: CreatePictureDto, userId: User, fileName: string): Promise<Picture>;
    findAll(): Promise<Picture[]>;
    getFileById(id: string): Promise<Picture>;
    update(id: string, updatePictureDto: UpdatePictureDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
