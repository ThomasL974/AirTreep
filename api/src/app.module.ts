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

@Module({
  imports: [UserModule, LikeModule, TagModule, TravelModule, CommentModule, PictureModule, FavouritesTravelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
