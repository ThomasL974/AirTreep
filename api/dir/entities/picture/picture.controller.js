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
exports.PictureController = exports.storage = void 0;
const common_1 = require("@nestjs/common");
const picture_service_1 = require("./picture.service");
const create_picture_dto_1 = require("./dto/create-picture.dto");
const update_picture_dto_1 = require("./dto/update-picture.dto");
const jwt_auth_guard_1 = require("../../core/guards/jwt-auth.guard");
const user_dacorator_1 = require("../../core/decorators/user.dacorator");
const user_entity_1 = require("../user/entities/user.entity");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path_1 = require("path");
exports.storage = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/destinationImages',
        filename: (req, file, cb) => {
            console.log(file);
            console.log(path_1.default);
            const filename = file.originalname.split('.')[0] + '-' + (0, uuid_1.v4)();
            const extension = file.originalname.split('.')[1];
            cb(null, `${filename}.${extension}`);
        }
    })
};
let PictureController = class PictureController {
    constructor(pictureService) {
        this.pictureService = pictureService;
    }
    async uploadFile(createPictureDto, userId, file) {
        return await this.pictureService.uploadFile(createPictureDto, userId, file.filename);
    }
    async findAll() {
        return await this.pictureService.findAll();
    }
    async getFileById(id, response) {
        const file = await this.pictureService.getFileById(id);
        return file;
    }
    async update(id, updatePictureDto) {
        return await this.pictureService.update(id, updatePictureDto);
    }
    async remove(id) {
        return await this.pictureService.remove(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(new jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', exports.storage)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_dacorator_1.CurrentUserId)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_picture_dto_1.CreatePictureDto, user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], PictureController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PictureController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PictureController.prototype, "getFileById", null);
__decorate([
    (0, common_1.UseGuards)(new jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_picture_dto_1.UpdatePictureDto]),
    __metadata("design:returntype", Promise)
], PictureController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(new jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PictureController.prototype, "remove", null);
PictureController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [picture_service_1.PictureService])
], PictureController);
exports.PictureController = PictureController;
//# sourceMappingURL=picture.controller.js.map