import { UserService } from './user.service';
import { CreateUserAccountDto, TokenResponseDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    login(CreateUserAccountDto: CreateUserAccountDto): Promise<TokenResponseDTO>;
    register(CreateUserAccountDto: CreateUserAccountDto): Promise<void>;
    findUserInfo(userId: User): Promise<User>;
}
