import { Comment } from "src/comment/entities/comment.entity";
import { FavouritesTravel } from "src/favourites-travel/entities/favourites-travel.entity";
import { Like } from "src/like/entities/like.entity";
import { Picture } from "src/picture/entities/picture.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { User } from "src/user/entities/user.entity";
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
