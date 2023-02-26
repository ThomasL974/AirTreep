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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Travel = void 0;
const comment_entity_1 = require("../../comment/entities/comment.entity");
const favourites_travel_entity_1 = require("../../favourites-travel/entities/favourites-travel.entity");
const like_entity_1 = require("../../like/entities/like.entity");
const picture_entity_1 = require("../../picture/entities/picture.entity");
const tag_entity_1 = require("../../tag/entities/tag.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Travel = class Travel {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Travel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Travel.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Travel.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Travel.prototype, "activityType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Travel.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Travel.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Travel.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Travel.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Travel.prototype, "unityTime", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Travel.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Travel.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Travel.prototype, "startLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Travel.prototype, "arrivalLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Travel.prototype, "latitudeStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Travel.prototype, "longitudeStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Travel.prototype, "latitudeEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Travel.prototype, "longitudeEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Travel.prototype, "coverPicture", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => picture_entity_1.Picture, picture => picture.travel, { nullable: true }),
    __metadata("design:type", Array)
], Travel.prototype, "pictures", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.travels),
    __metadata("design:type", user_entity_1.User)
], Travel.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tag_entity_1.Tag, tag => tag.travel),
    __metadata("design:type", Array)
], Travel.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, comment => comment.travel),
    __metadata("design:type", Array)
], Travel.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, like => like.travel),
    __metadata("design:type", Array)
], Travel.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favourites_travel_entity_1.FavouritesTravel, favouriteTravel => favouriteTravel.travel),
    __metadata("design:type", Array)
], Travel.prototype, "favourites", void 0);
Travel = __decorate([
    (0, typeorm_1.Entity)()
], Travel);
exports.Travel = Travel;
//# sourceMappingURL=travel.entity.js.map