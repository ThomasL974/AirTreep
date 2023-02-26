import { Repository } from 'typeorm';
import { CreateUserAccountDto, TokenResponseDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    login(CreateUserAccountDto: CreateUserAccountDto): Promise<TokenResponseDTO>;
    register(createUserAccountDto: CreateUserAccountDto): Promise<void>;
    getOne(userId: any): Promise<User>;
}
