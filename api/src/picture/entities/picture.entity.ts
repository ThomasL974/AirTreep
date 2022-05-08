import { Travel } from "src/travel/entities/travel.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Picture {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    position: string
    @Column()
    title: string
    @Column()
    urlImg: string
    @CreateDateColumn()
    createdAt: string
    @ManyToOne(() => Travel, travel => travel.pictures)
    travel: Travel
}
