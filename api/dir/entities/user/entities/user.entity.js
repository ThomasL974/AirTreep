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
exports.User = void 0;
const class_transformer_1 = require("class-transformer");
const comment_entity_1 = require("../../comment/entities/comment.entity");
const favourites_travel_entity_1 = require("../../favourites-travel/entities/favourites-travel.entity");
const like_entity_1 = require("../../like/entities/like.entity");
const picture_entity_1 = require("../../picture/entities/picture.entity");
const travel_entity_1 = require("../../travel/entities/travel.entity");
const typeorm_1 = require("typeorm");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "profilImg", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "pseudo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, comment => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, like => like.user),
    __metadata("design:type", Array)
], User.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => travel_entity_1.Travel, travel => travel.user),
    __metadata("design:type", Array)
], User.prototype, "travels", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favourites_travel_entity_1.FavouritesTravel, favouriteTravel => favouriteTravel.user),
    __metadata("design:type", Array)
], User.prototype, "favourites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => picture_entity_1.Picture, picture => picture.user, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "pictures", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map