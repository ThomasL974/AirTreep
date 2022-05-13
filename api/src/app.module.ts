import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LikeModule } from './like/like.module';
import { TagModule } from './tag/tag.module';
import { TravelModule } from './travel/travel.module';
import { CommentModule } from './comment/comment.module';
import { PictureModule } from './picture/picture.module';
import { FavouritesTravelModule } from './favourites-travel/favourites-travel.module';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

require('dotenv').config()

@Module({
  imports: [
    UserModule,
    LikeModule,
    TagModule,
    TravelModule,
    CommentModule,
    PictureModule,
    FavouritesTravelModule,
    RouterModule.register([
      {
        path: '/auth',
        module: UserModule,
      },
      {
        path: '/travel',
        module: TravelModule,
      },
      {
        path: '/like',
        module: LikeModule,
      },
      {
        path: '/comment',
        module: CommentModule,
      },
      {
        path: '/favourite',
        module: FavouritesTravelModule,
      },
      {
        path: '/picture',
        module: PictureModule,
      },
    ]),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      entities: [],
      synchronize: true,
      autoLoadEntities: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
