import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { CreateUserAccountDto, TokenResponseDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthenticationFailedError } from './exception/authentication-failed.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }


  // Authorized the User login
  async login(CreateUserAccountDto: CreateUserAccountDto): Promise<TokenResponseDTO> {
    const user = await this.userRepository.findOne({ where: { email: CreateUserAccountDto.email.toLowerCase() } });
    if (!user) {
      throw new AuthenticationFailedError('Aucun utilisateur trouvé');
    }

    const isVerified = await argon2.verify(user.password, CreateUserAccountDto.password)
    if (!isVerified) {
      throw new AuthenticationFailedError(HttpStatus.UNAUTHORIZED, 'L\'email ou le mot de passe n\'est pas valide');
    }

    let data = {
      userId: user.id,
    }

    const token = sign(data, process.env.JWT_SECRET || 'secret');
    return { token };
  }

  // Create User account
  async register(createUserAccountDto: CreateUserAccountDto) {
    const user = new User()
    // Set user informations
    user.email = createUserAccountDto.email.toLowerCase()

    const hashedPassword = await argon2.hash(createUserAccountDto.password)
    user.password = hashedPassword;

    try {
      await this.userRepository.save(user)
    } catch (error) {
      return {message: 'Account already exist!'}
    }
  }
}
