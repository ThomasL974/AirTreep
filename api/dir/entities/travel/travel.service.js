"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const travel_entity_1 = require("./entities/travel.entity");
let TravelService = class TravelService {
    constructor(travelsRepository) {
        this.travelsRepository = travelsRepository;
    }
    async create(createTravelDto, userId) {
        const travel = new travel_entity_1.Travel();
        travel.title = createTravelDto.title;
        travel.difficulty = createTravelDto.difficulty;
        travel.description = createTravelDto.description;
        travel.startLocation = createTravelDto.startLocation;
        travel.arrivalLocation = createTravelDto.arrivalLocation;
        travel.country = createTravelDto.country;
        travel.activityType = createTravelDto.activityType;
        travel.city = createTravelDto.city;
        travel.unityTime = createTravelDto.unityTime;
        travel.time = createTravelDto.time;
        travel.latitudeStart = createTravelDto.latitudeStart;
        travel.longitudeStart = createTravelDto.longitudeStart;
        if (userId) {
            travel.user = { id: userId };
        }
        else {
            throw new common_1.UnauthorizedException();
        }
        return await this.travelsRepository.save(travel);
    }
    async findAll(queries) {
        let where = {};
        try {
            if (queries) {
                where = Object.assign({}, queries);
                return await this.travelsRepository.find({
                    where: where,
                    relations: ['user', 'pictures', 'tags', 'comments', 'likes', 'favourites']
                });
            }
            else {
                return await this.travelsRepository.find({
                    relations: ['user', 'pictures', 'tags', 'comments', 'likes', 'favourites']
                });
            }
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async findAllByUserId(userId) {
        return await this.travelsRepository.find({
            where: {
                user: { id: userId },
            },
            relations: ['user'],
        });
    }
    async findOne(id) {
        return await this.travelsRepository.find({ where: { id }, relations: ['user', 'pictures', 'tags', 'comments', 'likes', 'favourites'] });
    }
    async update(id, updateTravelDto, userId) {
        const updateDate = new Date();
        const travel = await this.travelsRepository.findOne({ where: { id }, relations: ['user'] });
        if (travel.user.id !== userId) {
            throw new common_1.UnauthorizedException();
        }
        travel.title = updateTravelDto.title;
        travel.difficulty = updateTravelDto.difficulty;
        travel.description = updateTravelDto.description;
        travel.startLocation = updateTravelDto.startLocation;
        travel.arrivalLocation = updateTravelDto.arrivalLocation;
        travel.country = updateTravelDto.country;
        travel.activityType = updateTravelDto.activityType;
        travel.city = updateTravelDto.city;
        travel.unityTime = updateTravelDto.unityTime;
        travel.time = updateTravelDto.time;
        travel.latitudeStart = updateTravelDto.latitudeStart;
        travel.longitudeStart = updateTravelDto.longitudeStart;
        try {
            await this.travelsRepository.save(travel);
            return { message: 'Le voyage a été modifié' };
        }
        catch (error) {
            return { message: 'Le voyage n\'a pas été modifié' };
        }
    }
    async remove(id, userId) {
        const travel = await this.travelsRepository.findOne({ where: { id: id }, relations: ['user'] });
        if (travel.user.id !== userId) {
            throw new common_1.UnauthorizedException();
        }
        try {
            await this.travelsRepository.remove(travel);
            return { message: 'Le voyage a bien été supprimé' };
        }
        catch (error) {
            return { message: 'Le voyage n\'a pas été supprimé' };
        }
    }
};
TravelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(travel_entity_1.Travel)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TravelService);
exports.TravelService = TravelService;
//# sourceMappingURL=travel.service.js.map