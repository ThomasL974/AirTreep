import { Exclude } from "class-transformer";
import { IsEmail } from "class-validator";
import { Comment } from "src/entities/comment/entities/comment.entity";
import { FavouritesTravel } from "src/entities/favourites-travel/entities/favourites-travel.entity";
import { Like } from "src/entities/like/entities/like.entity";
import { Picture } from "src/entities/picture/entities/picture.entity";
import { Travel } from "../../../entities/travel/entities/travel.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column({ unique: true })
    @Exclude()
    email!: string
    @Column()
    @Exclude()
    password!: string
    @CreateDateColumn()
    @Exclude()
    createdAt!: string
    @Column({ nullable: true })
    firstName!: string
    @Column({ nullable: true })
    lastName!: string
    @Column({ nullable: true })
    description!: string
    @Column({ type: 'date', nullable: true })
    birthday!: string
    @Column({ nullable: true })
    profilImg!: string
    @Column({ nullable: true })
    pseudo!: string
    @OneToMany(() => Comment, comment => comment.user)
    comments!: Comment[]
    @OneToMany(() => Like, like => like.user)
    likes!: Like[]
    @OneToMany(() => Travel, travel => travel.user)
    travels!: Travel[]
    @OneToMany(() => FavouritesTravel, favouriteTravel => favouriteTravel.user)
    favourites!: FavouritesTravel[]
    @OneToMany(() => Picture, picture => picture.user, { nullable: true })
    pictures!: Picture[]
}
