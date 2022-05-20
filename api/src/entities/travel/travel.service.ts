import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Travel } from './entities/travel.entity';

@Injectable()
export class TravelService {

  constructor(
    @InjectRepository(Travel)
    private travelsRepository: Repository<Travel>
  ) { }

  async create(createTravelDto: CreateTravelDto, userId) {
    // Create new Travel
    const travel = new Travel();
    // Set Travel
    travel.title = createTravelDto.title
    travel.difficulty = createTravelDto.difficulty
    travel.description = createTravelDto.description
    travel.locomotionType = createTravelDto.locomotionType
    travel.startLocation = createTravelDto.startLocation
    travel.arrivalLocation = createTravelDto.arrivalLocation
    // Check if the user exist
    if(userId){
      travel.user = {id : userId} as User
    }else{
      return {message: "Un utilisateur est requis pour la création d'un voyage"}
    }

    return await this.travelsRepository.save(travel);
  }

  async findAll() : Promise<Travel[]> {
    return await this.travelsRepository.find(
      {
        relations: ['user', 'pictures', 'tags', 'comments', 'likes', 'favourites']
      }
    )
  }

  async findOne(id: number) {
    return await this.travelsRepository.findOneBy({id: id});
  }

  async update(id: number, updateTravelDto: UpdateTravelDto) {
    const updateDate = new Date()
    // Get travel by id
    const travel = await this.travelsRepository.findOneBy({id: id})
    // Update travel
    travel.title = updateTravelDto.title
    travel.difficulty = updateTravelDto.difficulty
    travel.description = updateTravelDto.description
    travel.updatedAt = updateDate
    travel.locomotionType = updateTravelDto.locomotionType
    travel.startLocation = updateTravelDto.startLocation
    travel.arrivalLocation = updateTravelDto.arrivalLocation
    
    try {
      await this.travelsRepository.save(travel);
      return {message: 'Le voyage a été modifié'}
    } catch (error) {
      return {message: 'Le voyage n\'a pas été modifié'}
    }
  }

  async remove(id: number) {
    const travel = await this.travelsRepository.findOneBy({id: id})
    try {
      await this.travelsRepository.remove(travel);
      return {message: 'Le voyage a bien été supprimé'}
    } catch (error) {
      return {message: 'Le voyage n\'a pas été supprimé'}
    }
  }
}
