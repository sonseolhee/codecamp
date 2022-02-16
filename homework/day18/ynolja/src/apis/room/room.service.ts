import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  async findAll() {
    return await this.roomRepository.find();
  }

  async findOne({ roomId }: { roomId: string }) {
    return await this.roomRepository.findOne({ id: roomId });
  }

  async create({ createRoomInput }: ICreate) {
    return await this.roomRepository.save({
      ...createRoomInput,
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

  async checkSoldOut({ roomId }: { roomId: string }) {
    const room = await this.roomRepository.findOne({ id: roomId });
    if (!room.inventory)
      throw new UnprocessableEntityException('이미 판매 완료된 상품!');
  }
}
