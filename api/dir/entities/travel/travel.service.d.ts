import { Repository } from 'typeorm';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Travel } from './entities/travel.entity';
export declare class TravelService {
    private travelsRepository;
    constructor(travelsRepository: Repository<Travel>);
    create(createTravelDto: CreateTravelDto, userId: any): Promise<Travel>;
    findAll(queries: any): Promise<Travel[]>;
    findAllByUserId(userId: any): Promise<Travel[]>;
    findOne(id: string): Promise<Travel[]>;
    update(id: string, updateTravelDto: UpdateTravelDto, userId: any): Promise<{
        message: string;
    }>;
    remove(id: string, userId: any): Promise<{
        message: string;
    }>;
}
