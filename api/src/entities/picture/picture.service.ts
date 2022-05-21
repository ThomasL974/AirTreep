import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Travel } from '../travel/entities/travel.entity';
import { User } from '../user/entities/user.entity';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { Picture } from './entities/picture.entity';

@Injectable()
export class PictureService {

  constructor(
    @InjectRepository(Picture)
    private picturesRepository: Repository<Picture>
  ) { }

  async create(createPictureDto: CreatePictureDto, userId: User) {
    const picture = new Picture()
    const travelId = createPictureDto.travelId
    picture.title = createPictureDto.title
    picture.location = createPictureDto.location
    picture.urlImg = createPictureDto.urlImg
    
    if(travelId){
      picture.travel = {id : travelId} as Travel
    }

    if(userId){
      picture.user = userId
    }
    
    try {
      return await this.picturesRepository.save(picture)
    } catch (error) {
      return {message: 'L\'image n\'a pas était créée'}
    }
  }

  async findAll() {
    return await this.picturesRepository.find({relations : ['travel', 'user']});
  }

  async findOne(id: number) {
    return await this.picturesRepository.find({where: {id}, relations: ['travel', 'user']});
  }

  async update(id: number, updatePictureDto: UpdatePictureDto) {
    const picture = await this.picturesRepository.findOneBy({id: id})
    picture.title = updatePictureDto.title
    picture.location = updatePictureDto.location
    picture.urlImg = updatePictureDto.urlImg

    try {
      await this.picturesRepository.save(picture)
      return {message: 'L\'image a bien été modifié'}
    } catch (error) {
      return {message: 'L\'image n\'a pas été modifié'}
    }
  }

  async remove(id: number) {
    try {
      await this.picturesRepository.delete({id: id})
      return {message: 'L\'image a bien été supprimé'}
    } catch (error) {
      return {message: 'L\'image n\'a pas été supprimé'}
    }
  }
}
