import { Comment } from "src/entities/comment/entities/comment.entity";
import { FavouritesTravel } from "src/entities/favourites-travel/entities/favourites-travel.entity";
import { Like } from "src/entities/like/entities/like.entity";
import { Picture } from "src/entities/picture/entities/picture.entity";
import { Tag } from "src/entities/tag/entities/tag.entity";
import { User } from "src/entities/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { Difficulties } from "../enums/travel.enum";

@Entity()
export class Travel {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column({nullable: true})
    title!: string
    @Column({nullable: true})
    country!: string
    @Column({nullable: true})
    activityType!: string
    @Column({nullable: true})
    city!: string
    @Column({nullable: true})
    difficulty!: string
    @Column({nullable: true})
    description!: string
    @Column({nullable: true})
    unityTime!: number
    @Column({nullable: true})
    time!: number
    @CreateDateColumn()
    createdAt!: string
    @Column({nullable: true})
    updatedAt!: Date
    @Column({nullable: true})
    startLocation!: string
    @Column({nullable: true})
    arrivalLocation!: string
    @Column({nullable: true})
    latitude!: number
    @Column({nullable: true})
    longitude!: number
    @OneToMany(() => Picture, picture => picture.travel, {nullable: true})
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
