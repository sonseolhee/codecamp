import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceTag } from '../placeTag/entities/placeTag.entity';
import { Place } from './entities/place.entity';
import { PlaceResolver } from './place.resolver';
import { PlaceService } from './place.service';

@Module({
  imports: [TypeOrmModule.forFeature([Place, PlaceTag])],
  providers: [
    PlaceResolver, //
    PlaceService,
  ],
})
export class PlaceModule {}
