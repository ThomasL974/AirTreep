import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async uploadFile(createPictureDto: CreatePictureDto, userId: User, dataBuffer: Buffer, filename: string, mymeType: string) {
    
    // const travelId = createPictureDto.travelId;

    const picture = await this.picturesRepository.create({
      mimeType: mymeType,
      fileName: filename,
      data: dataBuffer,
      user: userId,
    })

    

    try {
      return await this.picturesRepository.save(picture)
    } catch (error) {
      return { success: 'true', message: error.message }
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
