import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceTag } from '../placeTag/entities/placeTag.entity';
import { Place } from './entities/place.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(PlaceTag)
    private readonly placeTagRepository: Repository<PlaceTag>,
  ) {}

  async findAll() {
    return await this.placeRepository.find({
      relations: ['placeTags'],
    });
  }

  async findOne({ placeId }) {
    return await this.placeRepository.findOne({
      where: { id: placeId },
      relations: ['placeTags'],
    });
  }

  async create({ createPlaceInput }) {
    const { placeTags, ...place } = createPlaceInput;

    const placeTags_ = [];
    for (let i = 0; i < placeTags.length; i++) {
      const tagname = placeTags[i].replace('#', '');

      const prevTag = await this.placeTagRepository.findOne({
        name: tagname,
      });
      if (prevTag) {
        placeTags_.push(prevTag);
      } else {
        const newTag = await this.placeTagRepository.save({ name: tagname });
        placeTags_.push(newTag);
      }
    }

    return await this.placeRepository.save({
      ...place,
      placeTags: placeTags_,
    });
  }

  async delete({ placeId }) {
    const result = await this.placeRepository.delete({
      id: placeId,
    });
    return result.affected ? true : false;
  }
}
