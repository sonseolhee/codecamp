// import { HttpService } from '@nestjs/axios';
import {
  ConflictException,
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../room/entities/room.entity';
import { User } from '../user/entities/user.entity';
import {
  OrderTransaction,
  ORDER_TRANSACTION_STATUS_ENUM,
} from './entities/orderTransaction.entity';
import axios from 'axios';

@Injectable()
export class OrderTransactionService {
  constructor(
    // private readonly httpService: HttpService,

    @InjectRepository(OrderTransaction)
    private readonly orderTransactionRepository: Repository<OrderTransaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create({
    getPaymentData, //아임포트에서 제공해준 imp_uid, amount(getPaymentData.data.imp_uid(/amount))
    currentUser,
    roomId,
    checkInDate,
    checkOutDate,
  }) {
    const imp_uid = getPaymentData.data.response.imp_uid;
    const isAlreadyOrdered = await this.orderTransactionRepository.findOne({
      impUid: imp_uid,
    });
    if (isAlreadyOrdered) {
      throw new ConflictException('💛 이미 결제 데이터에 있는 결제건');
    }

    //결제 된 금액 vs 실제(상품)금액 일치 검증
    const room = await this.roomRepository.findOne({ id: roomId });
    const amountToBePaid = room.price;
    const { amount } = getPaymentData.data.response;

    if (amountToBePaid === amount) {
      // 상품재고관리 => 객실조회 : 빈방확인, 객실수-1 (Todo: 없으면 error)
      await this.roomRepository.update(
        { id: roomId },
        { inventory: room.inventory-- },
      );

      // orderTransaction 생성
      const orderTransaction_ = await this.orderTransactionRepository.create({
        impUid: imp_uid,
        amount: amountToBePaid,
        user: currentUser,
        status: ORDER_TRANSACTION_STATUS_ENUM.PAYMENT,
        room: roomId,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
      });

      const orderTransaction = await this.orderTransactionRepository.save(
        orderTransaction_,
      );

      //유저정보 조회 및 유저 orderTotalAmount 업데이트
      const user = await this.userRepository.findOne({ id: currentUser.id });
      await this.userRepository.update(
        { id: user.id },
        { orderTotalAmount: user.orderTotalAmount + amountToBePaid },
      );

      return orderTransaction;
    } else {
      throw new ConflictException('💛 가격정보 불일치');
    }
  }

  async cancel({ impUid, amount, currentUser }) {
    const order = await this.orderTransactionRepository.findOne({ impUid });
    console.log(order);
    if (order.status === ORDER_TRANSACTION_STATUS_ENUM.CANCEL) {
      throw new UnprocessableEntityException('이미 취소된 결제');
    }

    const cancelResult = await this.orderTransactionRepository.save({
      user: currentUser,
      // roomId: roomId,
      amount: -amount,
      status: ORDER_TRANSACTION_STATUS_ENUM.CANCEL,
    });

    //todo: User.OrderTotalAmount 값도 -amount 해줘야함

    return '취소완료';
  }
}
