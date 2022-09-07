import { Comment } from "../../comment/entities/comment.entity";
import { FavouritesTravel } from "../../favourites-travel/entities/favourites-travel.entity";
import { Like } from "../../like/entities/like.entity";
import { Picture } from "../../picture/entities/picture.entity";
import { Tag } from "../../tag/entities/tag.entity";
import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Travel {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column({nullable: true})
    title!: string
    @Column({nullable: true})
    address!: string
    @Column({nullable: true})
    country!: string
    @Column({nullable: true})
    postalCode!: number
    @Column({nullable: true})
    activityType!: string
    @Column({nullable: true})
    city!: string
    @Column({nullable: true})
    difficulty!: number
    @Column({nullable: true})
    description!: string
    @Column({nullable: true})
    time!: number
    @Column({nullable: true})
    unityTime!: number
    @CreateDateColumn()
    createdAt!: string
    @Column({nullable: true})
    updatedAt!: Date
    @Column({nullable: true})
    startLocation!: string
    @Column({nullable: true})
    arrivalLocation!: string
    @Column({nullable: true})
    latitudeStart!: number
    @Column({nullable: true})
    longitudeStart!: number
    @Column({nullable: true})
    latitudeEnd!: number
    @Column({nullable: true})
    longitudeEnd!: number
    @Column({nullable: true})
    coverPicture!: string
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
