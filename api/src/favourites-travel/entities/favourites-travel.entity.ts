import { Travel } from "src/travel/entities/travel.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FavouritesTravel {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    favourite: boolean
    @ManyToOne(() => User, user => user.favourites)
    user: User
    @ManyToOne(() => Travel, travel => travel.favourites)
    travel: Travel
}
