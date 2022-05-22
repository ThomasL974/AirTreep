import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { Repository } from 'typeorm';
import { Travel } from '../travel/entities/travel.entity';
import { User } from '../user/entities/user.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {

  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>
  ) { }

  async create(createLikeDto: CreateLikeDto, userId: User) {
    const like = new Like()
    like.liked = createLikeDto.liked
    like.travel = { id: createLikeDto.travelId } as Travel
    like.user = userId

    try {
      await this.likesRepository.save(like)
      return { message: 'J\'aime' }
    } catch (error) {
      return { message: 'Erreur au j\'aime' }
    }
  }

  async findAll() {
    return await this.likesRepository.find({ relations: ['travel', 'user'] });
  }

  async findOne(id: number) {
    return await this.likesRepository.find({ where: {id}, relations: ['user', 'travel'] });
  }

  async remove(id: number) {
    try {
      await this.likesRepository.delete({id: id})
      return {message: 'Je n\'aime plus'}
    } catch (error) {
      return {message: 'Le like n\'a pas été supprimé'}
    }
  }
}
