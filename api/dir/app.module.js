"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./entities/user/user.module");
const like_module_1 = require("./entities/like/like.module");
const tag_module_1 = require("./entities/tag/tag.module");
const travel_module_1 = require("./entities/travel/travel.module");
const comment_module_1 = require("./entities/comment/comment.module");
const picture_module_1 = require("./entities/picture/picture.module");
const favourites_travel_module_1 = require("./entities/favourites-travel/favourites-travel.module");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
require('dotenv').config();
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            tag_module_1.TagModule,
            travel_module_1.TravelModule,
            like_module_1.LikeModule,
            comment_module_1.CommentModule,
            favourites_travel_module_1.FavouritesTravelModule,
            picture_module_1.PictureModule,
            core_1.RouterModule.register([
                {
                    path: 'auth',
                    module: user_module_1.UserModule,
                },
                {
                    path: 'tag',
                    module: tag_module_1.TagModule
                },
                {
                    path: 'travels',
                    module: travel_module_1.TravelModule,
                },
                {
                    path: 'likes',
                    module: like_module_1.LikeModule,
                },
                {
                    path: 'comments',
                    module: comment_module_1.CommentModule,
                },
                {
                    path: 'favourites',
                    module: favourites_travel_module_1.FavouritesTravelModule,
                },
                {
                    path: 'pictures',
                    module: picture_module_1.PictureModule,
                },
            ]),
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASS,
                database: process.env.DATABASE_NAME,
                entities: [],
                synchronize: true,
                autoLoadEntities: true
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map