import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Travel } from '../travel/entities/travel.entity';
import { TravelService } from '../travel/travel.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { Picture } from './entities/picture.entity';

@Injectable()
export class PictureService {

  constructor(
    @InjectRepository(Picture)
    private picturesRepository: Repository<Picture>,
    private userService: UserService,
    private travelService: TravelService
  ) { }

  async uploadFile(createPictureDto: CreatePictureDto, userId: User, fileName: string) {
    if(userId){
      const picture = await this.picturesRepository.create({
        fileName: fileName,
        user: userId,
      })
      try {
        return await this.picturesRepository.save(picture)
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
  }

  async findAll() {
    return await this.picturesRepository.find({ relations: ['travel', 'user'] });
  }

  async getFileById(id: string) {
    return await this.picturesRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updatePictureDto: UpdatePictureDto) {
    const picture = await this.picturesRepository.findOne({ where: { id: id } })
    picture.fileName = updatePictureDto.title
    // picture.attachFile = updatePictureDto.urlImg

    try {
      await this.picturesRepository.save(picture)
      return { message: 'L\'image a bien été modifié' }
    } catch (error) {
      return { message: 'L\'image n\'a pas été modifié' }
    }
  }

  async remove(id: string) {
    try {
      await this.picturesRepository.delete({ id: id })
      return { message: 'L\'image a bien été supprimé' }
    } catch (error) {
      return { message: 'L\'image n\'a pas été supprimé' }
    }
  }
}
