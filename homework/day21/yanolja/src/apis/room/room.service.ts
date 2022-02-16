import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from '../place/entities/place.entity';
import { Usagetype } from '../usagetype/entities/usagetype.entity';
import { CreateRoomInput } from './dto/createRoom.input';
import { Room } from './entities/room.entity';

interface ICreate {
  createRoomInput: CreateRoomInput;
}

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(Usagetype)
    private readonly usagetypeRepository: Repository<Usagetype>,
  ) {}

  async findAll() {
    return await this.roomRepository.find({
      relations: ['place', 'usageType'],
    });
  }

  async findAllWithDeleted() {
    return await this.roomRepository.find({
      withDeleted: true,
      relations: ['place', 'usageType'],
    });
  }

  async findOne({ roomId }: { roomId: string }) {
    return await this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['place', 'usageType'],
    });
  }

  async create({ createRoomInput }: ICreate) {
    console.log(createRoomInput);

    const { roomUsagetype, roomPlaceId, ...room } = createRoomInput;

    const usageResult = await this.usagetypeRepository.save({
      ...roomUsagetype,
    });
    const placeResult = await this.placeRepository.findOne({
      id: roomPlaceId,
    });
    return await this.roomRepository.save({
      ...room,
      usageType: usageResult,
      place: placeResult,
    });
  }

  async updateRoom({ roomId, updateRoomInput }) {
    const room_ = await this.roomRepository.findOne({ id: roomId });
    const room = {
      ...room_,
      ...updateRoomInput,
    };
    return await this.roomRepository.save(room);
  }

  async delete({ roomId }) {
    const result = await this.roomRepository.softDelete({ id: roomId });
    return result.affected ? true : false;
  }

  async restore({ roomId }) {
    const result = await this.roomRepository.restore({ id: roomId });
    console.log(result);
    return result.affected ? true : false;
  }
}
