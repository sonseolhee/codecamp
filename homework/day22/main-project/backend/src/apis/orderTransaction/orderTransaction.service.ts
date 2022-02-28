import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../room/entities/room.entity';
import { User } from '../user/entities/user.entity';
import {
  OrderTransaction,
  ORDER_TRANSACTION_STATUS_ENUM,
} from './entities/orderTransaction.entity';

@Injectable()
export class OrderTransactionService {
  constructor(
    private readonly httpService: HttpService,

    @InjectRepository(OrderTransaction)
    private readonly orderTransactionRepository: Repository<OrderTransaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create({
    impUid,
    amount,
    currentUser,
    roomId,
    checkInDate,
    checkOutDate,
  }) {
    const orderTransaction_ = await this.orderTransactionRepository.create({
      impUid: impUid,
      amount: amount,
      user: currentUser,
      status: ORDER_TRANSACTION_STATUS_ENUM.PAYMENT,
      room: roomId,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    });

    // 객실조회 : 빈방확인, 객실수-1 (Todo: 없으면 error)
    const room = await this.roomRepository.findOne({ id: roomId });
    await this.roomRepository.update(
      { id: roomId },
      { inventory: room.inventory-- },
    );

    // orderTransaction 생성
    const orderTransaction = await this.orderTransactionRepository.save(
      orderTransaction_,
    );

    //유저정보 조회 및 유저 orderTotalAmount 업데이트
    const user = await this.userRepository.findOne({ id: currentUser.id });
    await this.userRepository.update(
      { id: user.id },
      { orderTotalAmount: user.orderTotalAmount + amount },
    );

    return orderTransaction;
  }

  // 결제정보조회
  async fetchPaymentInfo({ impUid, merchantUid }) {
    const getToken = await 
  }
}
