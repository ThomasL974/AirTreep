import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { User } from "src/entities/user/entities/user.entity"

export class CreateTravelDto {
    @IsString()
    @IsNotEmpty()
    title!: string
    country!: string
    @IsString()
    @IsNotEmpty()
    activityType!: string
    city!: string
    difficulty!: number
    @IsString()
    @IsNotEmpty()
    description!: string
    unityTime!: number
    time!: number
    startLocation!: string
    arrivalLocation!: string
    latitudeStart!: number
    longitudeStart!: number
    postalCode!: number
    address!: string
    userId!: User
}
