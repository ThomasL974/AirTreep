import { Travel } from "src/entities/travel/entities/travel.entity"

export class CreatePictureDto {
    location!: string
    title!: string
    urlImg!: string
    travelId!: number
}
