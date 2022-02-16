import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  async create({ createPlaceInput }) {
    return await this.placeRepository.save({ ...createPlaceInput });
  }

  async delete({ placeId }) {
    const result = await this.placeRepository.delete({
      id: placeId,
    });
    return result.affected ? true : false;
  }
}
