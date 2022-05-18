import { User } from "src/entities/user/entities/user.entity"

export class CreateTravelDto {
    title!: string
    difficulty!: number
    description!: string
    createdAt!: string
    locomotionType!: number
    startLocation!: string
    arrivalLocation!: string
    userId!: User
}
