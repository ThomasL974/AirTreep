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
    @IsNotEmpty({ message: 'Le prénom est requis' })
    firstName!: string
    @IsNotEmpty({ message: 'Le nom est requis' })
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
