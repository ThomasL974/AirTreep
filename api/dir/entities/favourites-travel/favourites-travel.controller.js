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
exports.FavouritesTravelController = void 0;
const common_1 = require("@nestjs/common");
const favourites_travel_service_1 = require("./favourites-travel.service");
const create_favourites_travel_dto_1 = require("./dto/create-favourites-travel.dto");
const update_favourites_travel_dto_1 = require("./dto/update-favourites-travel.dto");
let FavouritesTravelController = class FavouritesTravelController {
    constructor(favouritesTravelService) {
        this.favouritesTravelService = favouritesTravelService;
    }
    create(createFavouritesTravelDto) {
        return this.favouritesTravelService.create(createFavouritesTravelDto);
    }
    findAll() {
        return this.favouritesTravelService.findAll();
    }
    findOne(id) {
        return this.favouritesTravelService.findOne(+id);
    }
    update(id, updateFavouritesTravelDto) {
        return this.favouritesTravelService.update(+id, updateFavouritesTravelDto);
    }
    remove(id) {
        return this.favouritesTravelService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_favourites_travel_dto_1.CreateFavouritesTravelDto]),
    __metadata("design:returntype", void 0)
], FavouritesTravelController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FavouritesTravelController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FavouritesTravelController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_favourites_travel_dto_1.UpdateFavouritesTravelDto]),
    __metadata("design:returntype", void 0)
], FavouritesTravelController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FavouritesTravelController.prototype, "remove", null);
FavouritesTravelController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [favourites_travel_service_1.FavouritesTravelService])
], FavouritesTravelController);
exports.FavouritesTravelController = FavouritesTravelController;
//# sourceMappingURL=favourites-travel.controller.js.map