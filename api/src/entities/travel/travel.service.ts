import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Travel } from './entities/travel.entity';
import _ from 'lodash'

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
    travel.difficulty = +createTravelDto.difficulty
    travel.description = createTravelDto.description
    travel.startLocation = createTravelDto.startLocation
    travel.arrivalLocation = createTravelDto.arrivalLocation
    travel.country = createTravelDto.country
    travel.activityType = createTravelDto.activityType
    travel.city = createTravelDto.city
    travel.unityTime = createTravelDto.unityTime
    travel.time = +createTravelDto.time
    travel.latitudeStart = createTravelDto.latitudeStart
    travel.longitudeStart = createTravelDto.longitudeStart
    travel.postalCode = createTravelDto.postalCode
    travel.address = createTravelDto.address
    // Check if the user exist

    console.log(travel);
    if (userId) {
      travel.user = { id: userId } as User
    } else {
      throw new UnauthorizedException();
    }

    return await this.travelsRepository.save(travel);
  }

  async findAll(queries): Promise<Travel[]> {
    console.log(queries.title);
    try {
      if (!this._isEmptyObject(queries)) {
        console.log(queries);
        return await this.travelsRepository.find(
          {
            select: {
              user: {
                id: true,
                lastName: true,
                firstName: true,
                password: false,
                email: false
              }
            },
            where: { title: Like(`%${queries.title.replace(' ','+')}%`) },
            relations: ['user', 'pictures', 'likes', 'favourites']
          }
        )
      } else {
        console.log("hello");
        return await this.travelsRepository.find(
          {
            select: {
              user: {
                id: true,
                lastName: true,
                firstName: true,
                password: false,
                email: false
              }
            },
            relations: ['user', 'pictures', 'likes', 'favourites']
          }
        )
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAllByUserId(userId, queries): Promise<Travel[]> {
    let where = {} as any;
    try {
      if (!this._isEmptyObject(queries)) {
        where = { ...queries };
        return await this.travelsRepository.find(
          {
            select: {
              user: {
                id: true,
                lastName: true,
                firstName: true,
                password: false,
                email: false
              }
            },
            where: { title: Like(`%${encodeURIComponent(queries.title)}%`),  user: { id: userId }},
            relations: ['user', 'pictures', 'likes', 'favourites']
          }
        )
      } else {
        return await this.travelsRepository.find({
          select: {
            user: {
              id: true,
              lastName: true,
              firstName: true,
              password: false,
              email: false
            }
          },
          where: {
            user: { id: userId },
          },
          relations: ['user'],
        });
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async findOne(id: string): Promise<Travel[]> {
    return await this.travelsRepository.find(
      {
        select: {
          user: {
            id: true,
            lastName: true,
            firstName: true,
            pseudo: true,
            password: false,
            email: false
          }
        },
        where: { id },
        relations: ['user', 'pictures', 'likes', 'favourites']
      });
  }

  async update(id: string, updateTravelDto: UpdateTravelDto, userId) {
    // Get travel by id
    const travel = await this.travelsRepository.findOne({ where: { id }, relations: ['user'] })

    if (travel.user.id !== userId) {
      throw new UnauthorizedException();
    }
    // Update travel
    travel.title = updateTravelDto.title
    travel.difficulty = updateTravelDto.difficulty
    travel.description = updateTravelDto.description
    travel.startLocation = updateTravelDto.startLocation
    travel.arrivalLocation = updateTravelDto.arrivalLocation
    travel.country = updateTravelDto.country
    travel.activityType = updateTravelDto.activityType
    travel.city = updateTravelDto.city
    travel.unityTime = updateTravelDto.unityTime
    travel.time = updateTravelDto.time
    travel.latitudeStart = updateTravelDto.latitudeStart
    travel.longitudeStart = updateTravelDto.longitudeStart
    travel.address = updateTravelDto.address
    travel.postalCode = updateTravelDto.postalCode

    try {
      await this.travelsRepository.save(travel);
      return { message: 'Le voyage a été modifié' }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async remove(id: string, userId) {
    const travel = await this.travelsRepository.findOne({ where: { id: id }, relations: ['user'] },)
    if (travel.user.id !== userId) {
      throw new UnauthorizedException();
    }
    try {
      await this.travelsRepository.remove(travel);
      return { message: 'Le voyage a bien été supprimé' }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private _isEmptyObject(object: any): boolean {
    return (typeof object === 'object' && Object.keys(object).length === 0);
  }
}
