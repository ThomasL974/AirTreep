import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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
      userName: user.firstName
    }

    const token = sign(data, process.env.JWT_SECRET || 'secret');
    return { token };
  }

  // Create User account
  async register(createUserAccountDto: CreateUserAccountDto) {
    const user = new User()
    let upperCaseFirstLetter = [];
    let lastName = ''

    // format firtsname
    if(createUserAccountDto.firstName){
      upperCaseFirstLetter = createUserAccountDto.firstName.split('');
      upperCaseFirstLetter.forEach((value, key) => {
        if(key === 0){
          return value.toUpperCase();
        }
        return value
      })
    }

    // Set user informations
    user.firstName = upperCaseFirstLetter.join('');

    if(createUserAccountDto.lastName){
      lastName = createUserAccountDto.lastName.toUpperCase()
    }
    
    user.lastName = lastName
    user.description = createUserAccountDto.description
    user.pseudo = createUserAccountDto.pseudo
    user.email = createUserAccountDto.email

    const hashedPassword = await argon2.hash(createUserAccountDto.password)
    user.password = hashedPassword;

    try {
      await this.userRepository.save(user)
    } catch (error) {
      throw new AuthenticationFailedError(HttpStatus.UNAUTHORIZED, 'Un compte existe déjà !');
    }
  }

  async getOne(userId) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if(!user){
      throw new UnauthorizedException();
    }
    try {
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async updateOne(userId, updateUserDto: UpdateUserDto, img: string){
    const user = await this.getOne(userId);
    if(!user){
      throw new UnauthorizedException();
    }

    user.firstName = updateUserDto.firstName
    user.lastName = updateUserDto.lastName
    user.description = updateUserDto.description
    user.pseudo = updateUserDto.pseudo
    user.profilImg = img

    try {
      await this.userRepository.save(user)
      return { message: 'L\'utilisateur à bien été sauvegardé' }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
