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
exports.TravelController = void 0;
const common_1 = require("@nestjs/common");
const travel_service_1 = require("./travel.service");
const create_travel_dto_1 = require("./dto/create-travel.dto");
const update_travel_dto_1 = require("./dto/update-travel.dto");
const jwt_auth_guard_1 = require("../../core/guards/jwt-auth.guard");
const user_dacorator_1 = require("../../core/decorators/user.dacorator");
const user_entity_1 = require("../user/entities/user.entity");
let TravelController = class TravelController {
    constructor(travelService) {
        this.travelService = travelService;
    }
    async findAll(queries) {
        return await this.travelService.findAll(queries);
    }
    async findAllByUserId(userId) {
        return await this.travelService.findAllByUserId(userId);
    }
    async create(createTravelDto, userId) {
        return await this.travelService.create(createTravelDto, userId);
    }
    async findOne(id) {
        return await this.travelService.findOne(id);
    }
    async update(id, updateTravelDto, userId) {
        return await this.travelService.update(id, updateTravelDto, userId);
    }
    async remove(id, userId) {
        return await this.travelService.remove(id, userId);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('list/mts'),
    __param(0, (0, user_dacorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "findAllByUserId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_dacorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_travel_dto_1.CreateTravelDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_dacorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_travel_dto_1.UpdateTravelDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, user_dacorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "remove", null);
TravelController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [travel_service_1.TravelService])
], TravelController);
exports.TravelController = TravelController;
//# sourceMappingURL=travel.controller.js.map