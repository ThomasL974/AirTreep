import { Travel } from "src/travel/entities/travel.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    description!: string
    @CreateDateColumn()
    createdAt!: string
    @ManyToOne(() => User, user => user.comments)
    user!: User
    @ManyToOne(()=>Travel, travel=>travel.comments)
    travel!: Travel
}
