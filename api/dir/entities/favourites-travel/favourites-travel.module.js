"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouritesTravelModule = void 0;
const common_1 = require("@nestjs/common");
const favourites_travel_service_1 = require("./favourites-travel.service");
const favourites_travel_controller_1 = require("./favourites-travel.controller");
const typeorm_1 = require("@nestjs/typeorm");
const favourites_travel_entity_1 = require("./entities/favourites-travel.entity");
let FavouritesTravelModule = class FavouritesTravelModule {
};
FavouritesTravelModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([favourites_travel_entity_1.FavouritesTravel])
        ],
        controllers: [favourites_travel_controller_1.FavouritesTravelController],
        providers: [favourites_travel_service_1.FavouritesTravelService]
    })
], FavouritesTravelModule);
exports.FavouritesTravelModule = FavouritesTravelModule;
//# sourceMappingURL=favourites-travel.module.js.map