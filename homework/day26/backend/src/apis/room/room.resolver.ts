import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoomInput } from './dto/createRoom.input';
import { UpdateRoomInput } from './dto/updateRoom.input';
import { Room } from './entities/room.entity';
import { RoomService } from './room.service';

@Resolver()
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Query(() => [Room])
  async fetchRoomList() {
    return await this.roomService.findAll();
  }

  @Query(() => [Room])
  async fetchRoomListWithDeleted() {
    return await this.roomService.findAllWithDeleted();
  }

  @Query(() => Room)
  async fetchRoom(@Args('roomId') roomId: string) {
    return await this.roomService.findOne({ roomId });
  }

  @Mutation(() => Room)
  async createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return await this.roomService.create({ createRoomInput });
  }

  @Mutation(() => Room)
  async updateRoom(
    @Args('roomId') roomId: string,
    @Args('updateRoomInput') updateRoomInput: UpdateRoomInput,
  ) {
    // await this.roomService.checkSoldOut({ roomId });
    return await this.roomService.updateRoom({ roomId, updateRoomInput });
  }

  @Mutation(() => Boolean)
  async deleteRoom(@Args('roomId') roomId: string) {
    return await this.roomService.delete({ roomId });
  }

  @Mutation(() => Boolean)
  async restoreRoom(@Args('roomId') roomId: string) {
    return await this.roomService.restore({ roomId });
  }
}
