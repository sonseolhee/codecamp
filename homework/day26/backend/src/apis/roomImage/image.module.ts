import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../room/entities/room.entity';
import { RoomImage } from './entities/image.entity';
import { RoomImageResolver } from './image.resolver';
import { RoomImageService } from './image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Room, //
      RoomImage,
    ]),
  ],
  providers: [
    RoomImageResolver, //
    RoomImageService,
  ],
})
export class RoomImageModule {}
