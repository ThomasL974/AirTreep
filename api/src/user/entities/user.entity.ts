import { IsEmail } from "class-validator";
import { Comment } from "src/comment/entities/comment.entity";
import { FavouritesTravel } from "src/favourites-travel/entities/favourites-travel.entity";
import { Like } from "src/like/entities/like.entity";
import { Travel } from "src/travel/entities/travel.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ unique: true })
    @IsEmail({ message: 'L\'email n\'est pas correct' })
    email: string
    @Column()
    password: string
    @CreateDateColumn()
    createdAt: string
    @Column()
    firstName: string
    @Column()
    lastName: string
    @Column()
    description: string
    @Column({ type: 'date' })
    birthday: string
    @Column()
    profilImg: string
    @Column()
    pseudo: string
    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[]
    @OneToMany(() => Like, like => like.user)
    likes: Like[]
    @OneToMany(() => Travel, travel => travel.user)
    travels: Travel[]
    @OneToMany(() => FavouritesTravel, favouriteTravel => favouriteTravel.user)
    favourites: FavouritesTravel[]
}
