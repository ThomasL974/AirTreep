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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
let CommentService = class CommentService {
    constructor(commentsRepository) {
        this.commentsRepository = commentsRepository;
    }
    async create(createCommentDto, userId) {
        const comment = new comment_entity_1.Comment();
        comment.description = createCommentDto.description;
        comment.travel = { id: createCommentDto.travel };
        comment.user = userId;
        try {
            await this.commentsRepository.save(comment);
            return { message: 'Le commentaire a été créé' };
        }
        catch (error) {
            return { message: 'Aucun commentaire n\'a été créé' };
        }
    }
    async findAll() {
        return await this.commentsRepository.find({ relations: ['travel', 'user'] });
    }
    async findOne(id) {
        return await this.commentsRepository.find({ where: { id }, relations: ['travel', 'user'] });
    }
    async update(id, updateCommentDto) {
        const comment = await this.commentsRepository.findOneBy({ id: id });
        comment.description = updateCommentDto.description;
        comment.editedAt = new Date();
        try {
            await this.commentsRepository.save(comment);
            return { message: 'Commentaire modifié' };
        }
        catch (error) {
            return { message: 'Commentaire non modifié' };
        }
    }
    async remove(id) {
        try {
            await this.commentsRepository.delete(id);
            return { message: 'Commentaire supprimé' };
        }
        catch (error) {
            return { message: 'Le commentaire n\'a pas été supprimé' };
        }
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map