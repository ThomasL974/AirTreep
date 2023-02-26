import { Comment } from "src/entities/comment/entities/comment.entity"
import { FavouritesTravel } from "src/entities/favourites-travel/entities/favourites-travel.entity"
import { Like } from "src/entities/like/entities/like.entity"
import { Travel } from "../../../entities/travel/entities/travel.entity"
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserAccountDto {
    @IsNotEmpty({message: 'email empty'})
    @IsEmail()
    @IsString()
    email!: string
    @IsNotEmpty({ message: 'password empty' })
    @IsString()
    password!: string
    createdAt!: string
    firstName!: string
    lastName!: string
    description!: string
    birthday!: string
    profilImg!: string
    pseudo!: string
    comments!: Comment[]
    likes!: Like[]
    travels!: Travel[]
    favourites!: FavouritesTravel[]
}

export class TokenResponseDTO {
    token: string
}
