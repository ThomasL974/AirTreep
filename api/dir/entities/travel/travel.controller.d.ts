import { TravelService } from './travel.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { User } from '../user/entities/user.entity';
export declare class TravelController {
    private readonly travelService;
    constructor(travelService: TravelService);
    findAll(queries: any): Promise<import("./entities/travel.entity").Travel[]>;
    findAllByUserId(userId: User): Promise<import("./entities/travel.entity").Travel[]>;
    create(createTravelDto: CreateTravelDto, userId: User): Promise<import("./entities/travel.entity").Travel>;
    findOne(id: string): Promise<import("./entities/travel.entity").Travel[]>;
    update(id: string, updateTravelDto: UpdateTravelDto, userId: User): Promise<{
        message: string;
    }>;
    remove(id: string, userId: User): Promise<{
        message: string;
    }>;
}
