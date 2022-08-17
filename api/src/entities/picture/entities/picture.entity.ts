import { Travel } from "src/entities/travel/entities/travel.entity";
import { User } from "src/entities/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Picture {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column()
    fileName!: string
    @Column({
        type: 'bytea',
    })
    data!: Uint8Array
    @Column()
    mimeType!: string
    @CreateDateColumn()
    createdAt!: string
    @ManyToOne(() => Travel, travel => travel.pictures)
    travel!: Travel
    @ManyToOne(() => User, user => user.pictures)
    user!: User
}
