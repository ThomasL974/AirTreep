import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Travel } from './entities/travel.entity';

@Injectable()
export class TravelService {

  constructor(
    @InjectRepository(Travel)
    private travelsRepository: Repository<Travel>
  ) { }

  create(createTravelDto: CreateTravelDto, userId) {
    // Create new Travel
    const travel = new Travel();
    travel.title = createTravelDto.title
    travel.difficulty = createTravelDto.difficulty
    travel.description = createTravelDto.description
    travel.locomotionType = createTravelDto.locomotionType
    travel.startLocation = createTravelDto.startLocation
    travel.arrivalLocation = createTravelDto.arrivalLocation
    
    if(userId){
      travel.user = {id : userId} as User
    }
    return this.travelsRepository.save(travel);
  }

  findAll() {
    return `This action returns all travel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} travel`;
  }

  update(id: number, updateTravelDto: UpdateTravelDto) {
    return `This action updates a #${id} travel`;
  }

  remove(id: number) {
    return `This action removes a #${id} travel`;
  }
}
