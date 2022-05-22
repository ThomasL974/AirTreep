import { Travel } from "src/entities/travel/entities/travel.entity";
import { User } from "src/entities/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    liked!: boolean
    @ManyToOne(() => User, user => user.likes)
    user!: User
    @ManyToOne(() => Travel, travel => travel.likes)
    travel!: Travel
}
