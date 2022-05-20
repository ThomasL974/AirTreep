import { Travel } from "src/entities/travel/entities/travel.entity";
import { User } from "src/entities/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Picture {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    location!: string
    @Column()
    title!: string
    @Column()
    urlImg!: string
    @CreateDateColumn()
    createdAt!: string
    @ManyToOne(() => Travel, travel => travel.pictures)
    travel!: Travel
    @ManyToOne(() => User, user => user.pictures)
    user!: User
}
