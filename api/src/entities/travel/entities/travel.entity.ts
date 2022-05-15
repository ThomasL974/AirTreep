import { Comment } from "src/entities/comment/entities/comment.entity";
import { FavouritesTravel } from "src/entities/favourites-travel/entities/favourites-travel.entity";
import { Like } from "src/entities/like/entities/like.entity";
import { Picture } from "src/entities/picture/entities/picture.entity";
import { Tag } from "src/entities/tag/entities/tag.entity";
import { User } from "src/entities/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Travel {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    title!: string
    @Column()
    difficulty!: number
    @Column()
    description!: string
    @CreateDateColumn()
    createdAt!: string
    @Column()
    locomotionType!: number
    @Column()
    startLocation!: string
    @Column()
    arrivalLocation!: string
    @OneToMany(() => Picture, picture => picture.travel)
    pictures!: Picture[]
    @ManyToOne(() => User, user => user.travels)
    user!: User
    @OneToMany(() => Tag, tag => tag.travel)
    tags!: Tag[]
    @OneToMany(() => Comment, comment => comment.travel)
    comments!: Comment[]
    @OneToMany(() => Like, like => like.travel)
    likes!: Like[]
    @OneToMany(() => FavouritesTravel, favouriteTravel => favouriteTravel.travel)
    favourites!: FavouritesTravel[]
}
