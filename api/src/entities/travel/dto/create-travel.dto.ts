import { IsEmpty } from "class-validator"
import { User } from "src/entities/user/entities/user.entity"
// import { Difficulties } from "../enums/travel.enum"

export class CreateTravelDto {
    @IsEmpty({message: 'Un titre est requis'})
    title!: string
    country!: string
    activityType!: string
    city!: string
    difficulty!: string
    description!: string
    unityTime!: number
    time!: number
    startLocation!: string
    arrivalLocation!: string
    latitude!: number
    longitude!: number
    userId!: User
}
