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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const argon2 = require("argon2");
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const authentication_failed_exception_1 = require("./exception/authentication-failed.exception");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async login(CreateUserAccountDto) {
        const user = await this.userRepository.findOne({ where: { email: CreateUserAccountDto.email.toLowerCase() } });
        if (!user) {
            throw new authentication_failed_exception_1.AuthenticationFailedError('Aucun utilisateur trouvé');
        }
        const isVerified = await argon2.verify(user.password, CreateUserAccountDto.password);
        if (!isVerified) {
            throw new authentication_failed_exception_1.AuthenticationFailedError(common_1.HttpStatus.UNAUTHORIZED, 'L\'email ou le mot de passe n\'est pas valide');
        }
        let data = {
            userId: user.id,
            userName: user.firstName
        };
        const token = (0, jsonwebtoken_1.sign)(data, process.env.JWT_SECRET || 'secret');
        return { token };
    }
    async register(createUserAccountDto) {
        const user = new user_entity_1.User();
        let upperCaseFirstLetter = [];
        let lastName = '';
        if (createUserAccountDto.firstName) {
            upperCaseFirstLetter = createUserAccountDto.firstName.split('');
            upperCaseFirstLetter.forEach((value, key) => {
                if (key === 0) {
                    return value.toUpperCase();
                }
                return value;
            });
        }
        user.firstName = upperCaseFirstLetter.join('');
        if (createUserAccountDto.lastName) {
            lastName = createUserAccountDto.lastName.toUpperCase();
        }
        user.lastName = lastName;
        user.description = createUserAccountDto.description;
        user.pseudo = createUserAccountDto.pseudo;
        user.email = createUserAccountDto.email;
        const hashedPassword = await argon2.hash(createUserAccountDto.password);
        user.password = hashedPassword;
        try {
            await this.userRepository.save(user);
        }
        catch (error) {
            throw new authentication_failed_exception_1.AuthenticationFailedError(common_1.HttpStatus.UNAUTHORIZED, 'Un compte existe déjà !');
        }
    }
    async getOne(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        try {
            return user;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map