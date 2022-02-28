import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePlaceInput } from './dto/createPlace.input';
import { Place } from './entities/place.entity';
import { PlaceService } from './place.service';

@Resolver()
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}

  @Mutation(() => Place)
  async createPlace(
    @Args('createPlaceInput') createPlaceInput: CreatePlaceInput,
  ) {
    return await this.placeService.create({ createPlaceInput });
  }

  @Mutation(() => Boolean)
  async deletePlace(@Args('placeId') placeId: string) {
    return await this.placeService.delete({ placeId });
  }
}
