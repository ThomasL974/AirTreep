import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './entities/picture.entity';
import { UserModule } from '../user/user.module';
import { TravelModule } from '../travel/travel.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Picture]),
    UserModule,
    TravelModule
  ],
  controllers: [PictureController],
  providers: [PictureService]
})
export class PictureModule {}
