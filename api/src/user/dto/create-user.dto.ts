import { Comment } from "src/comment/entities/comment.entity"
import { FavouritesTravel } from "src/favourites-travel/entities/favourites-travel.entity"
import { Like } from "src/like/entities/like.entity"
import { Travel } from "src/travel/entities/travel.entity"
import { IsNotEmpty } from 'class-validator'

export class CreateUserAccountDto {
    id!: number
    @IsNotEmpty({message: 'L\'email est requis'})
    email!: string
    @IsNotEmpty({ message: 'Le mot de passe est requis' })
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
