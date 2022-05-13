import { Travel } from "src/travel/entities/travel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    libelle!: string
    @ManyToOne(() => Travel, travel => travel.tags)
    travel!: Travel
}
