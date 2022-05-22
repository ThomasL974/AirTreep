import { IsEmpty } from "class-validator"
import { User } from "src/entities/user/entities/user.entity"
import { Difficulties } from "../enums/travel.enum"

export class CreateTravelDto {
    @IsEmpty({message: 'Un titre est requis'})
    title!: string
    difficulty!: Difficulties
    description!: string
    createdAt!: string
    locomotionType!: number
    @IsEmpty({message: 'Un départ est requis'})
    startLocation!: string
    @IsEmpty({message: 'Un arrivé est requis'})
    arrivalLocation!: string
    userId!: User
}
