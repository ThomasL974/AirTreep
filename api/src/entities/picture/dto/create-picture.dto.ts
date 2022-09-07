import { Travel } from "../../travel/entities/travel.entity"
import { User } from "../../user/entities/user.entity"

export class CreatePictureDto {
    title!: string
    urlImg!: string
    travelId!: Travel
    userId!: User
}
