import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from '../place/entities/place.entity';
import { Usagetype } from '../usagetype/entities/usagetype.entity';
import { Room } from './entities/room.entity';
import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Place, Usagetype])],
  providers: [
    RoomResolver, //
    RoomService,
  ],
})
export class RoomModule {}
