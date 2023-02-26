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
exports.LikeController = void 0;
const common_1 = require("@nestjs/common");
const like_service_1 = require("./like.service");
const create_like_dto_1 = require("./dto/create-like.dto");
const jwt_auth_guard_1 = require("../../core/guards/jwt-auth.guard");
const user_dacorator_1 = require("../../core/decorators/user.dacorator");
const user_entity_1 = require("../user/entities/user.entity");
let LikeController = class LikeController {
    constructor(likeService) {
        this.likeService = likeService;
    }
    async create(createLikeDto, userId) {
        return await this.likeService.create(createLikeDto, userId);
    }
    async findAll() {
        return await this.likeService.findAll();
    }
    async findOne(id) {
        return await this.likeService.findOne(id);
    }
    async remove(id) {
        return await this.likeService.remove(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(new jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_dacorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_like_dto_1.CreateLikeDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(new jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "remove", null);
LikeController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [like_service_1.LikeService])
], LikeController);
exports.LikeController = LikeController;
//# sourceMappingURL=like.controller.js.map