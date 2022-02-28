import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../room/entities/room.entity';
import { RoomImage } from './entities/image.entity';

@Injectable()
export class RoomImageService {
  constructor(
    @InjectRepository(RoomImage)
    private readonly roomImageRespository: Repository<RoomImage>,

    @InjectRepository(Room)
    private readonly roomRespository: Repository<Room>,
  ) {}

  async createRoomImage({ createRoomImageInput }) {
    const urlList = createRoomImageInput.urls;
    const room = await this.roomRespository.findOne({
      id: createRoomImageInput.roomId,
    });

    const roomImage = await Promise.all(
      urlList.map((url: any, i: string | number) =>
        this.roomImageRespository.save({
          isMain: createRoomImageInput.isMain[i],
          room,
          url,
        }),
      ),
    );

    return roomImage;
  }

  async updateRoomImage({ createRoomImageInput }) {
    const urlList = createRoomImageInput.urls;

    await this.roomImageRespository.delete({
      room: createRoomImageInput.roomId,
    });

    const room = await this.roomRespository.findOne({
      id: createRoomImageInput.roomId,
    });

    return await Promise.all(
      urlList.map((url: any, i: string | number) =>
        this.roomImageRespository.save({
          isMain: createRoomImageInput.isMain[i],
          room,
          url,
        }),
      ),
    );
  }
}
