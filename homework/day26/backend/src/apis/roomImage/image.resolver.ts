import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateRoomImageInput } from './dto/createRoomImage.input';
import { RoomImage } from './entities/image.entity';
import { RoomImageService } from './image.service';

@Resolver()
export class RoomImageResolver {
  constructor(private readonly roomImageService: RoomImageService) {}

  @Mutation(() => [RoomImage])
  async createRoomImage(
    @Args('createRoomImageInput') createRoomImageInput: CreateRoomImageInput,
  ) {
    return await this.roomImageService.createRoomImage({
      createRoomImageInput,
    });
  }

  @Mutation(() => [RoomImage])
  async updateRoomImage(
    @Args('createRoomImageInput') createRoomImageInput: CreateRoomImageInput,
  ) {
    return await this.roomImageService.updateRoomImage({
      createRoomImageInput,
    });
  }
}
