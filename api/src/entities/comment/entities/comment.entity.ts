import { Travel } from "src/entities/travel/entities/travel.entity";
import { User } from "src/entities/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column()
    description!: string
    @CreateDateColumn()
    createdAt!: string
    @Column({nullable: true})
    editedAt!: Date
    @ManyToOne(() => User, user => user.comments)
    user!: User
    @ManyToOne(()=>Travel, travel=>travel.comments)
    travel!: Travel
}
