import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { PlaceResolver } from './place.resolver';
import { PlaceService } from './place.service';

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  providers: [
    PlaceResolver, //
    PlaceService,
  ],
})
export class PlaceModule {}
