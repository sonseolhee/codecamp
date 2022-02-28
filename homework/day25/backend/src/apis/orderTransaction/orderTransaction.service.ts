// import { HttpService } from '@nestjs/axios';
import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Room } from '../room/entities/room.entity';
import { User } from '../user/entities/user.entity';
import {
  OrderTransaction,
  ORDER_TRANSACTION_STATUS_ENUM,
} from './entities/orderTransaction.entity';

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

    private readonly connectioin: Connection,
  ) {}

  //create 로 삽입
  async checkDuplicateOrder({ impUid }) {

    const queryRunner = await this.connectioin.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction('SERIALIZABLE')

    try{
      
      await queryRunner.commitTransaction()//??

    }catch(error){
      await queryRunner.rollbackTransaction()
    }finally{
      await queryRunner.release()
    }
    
  }

  async create({
    impUid,
    amount, 
    currentUser,
    roomId,
    checkInDate,
    checkOutDate,
  }) {
    const queryRunner = await this.connectioin.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    const existedOrder = await queryRunner.manager.findOne(
      OrderTransaction,
      {impUid}
    )
    if (existedOrder) throw new ConflictException('이미 결제 데이터에 있는 결제건 입니다.');


    try {
      const room = await queryRunner.manager.findOne(
        Room,
        { id: roomId },
        { lock: { mode: 'pessimistic_write' } },
      );

      const room_ = this.roomRepository.create({
        ...room,
        inventory: room.inventory - 1,
      });

      await queryRunner.manager.save(room_);

      const orderTransaction_ = await this.orderTransactionRepository.create({
        impUid,
        amount,
        user: currentUser,
        status: ORDER_TRANSACTION_STATUS_ENUM.PAYMENT,
        room: roomId,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
      });

      const orderTransaction = await queryRunner.manager.save(
        orderTransaction_,
      );

      const user = await queryRunner.manager.findOne(User, {
        id: currentUser.id,
      });

      await queryRunner.manager.update(
        User,
        { id: user.id },
        { orderTotalAmount: user.orderTotalAmount + amount },
      );
      await queryRunner.commitTransaction();
      return orderTransaction;
    } catch (error) {
      
      await queryRunner.rollbackTransaction();

    } finally {
      
      await queryRunner.release();

    }
  }

  async checkAlreadyCancel({ impUid }) {
    const hasBeenCanceled = await this.orderTransactionRepository.findOne({
      impUid,
      status: ORDER_TRANSACTION_STATUS_ENUM.CANCEL,
    });
    if (hasBeenCanceled)
      throw new ConflictException('이미 취소된 결제건입니다.');
  }

  async checkProperUserTryingtoCancel({ impUid, currentUser }) {
    const order = await this.orderTransactionRepository.findOne({
      impUid,
      user: { id: currentUser.id },
      status: ORDER_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    if (!order)
      throw new UnprocessableEntityException(
        '회원님의 결제기록이 존재하지 않습니다.',
      );
  }

  async cancel({ impUid, amount }) {
    const queryRunner = await this.connectioin.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const { id, ...rest } = await queryRunner.manager.findOne(
        OrderTransaction,
        { impUid },
        { lock: { mode: 'pessimistic_write' } },
      );
      console.log('💛', rest);

      const afterCancelOrder = await this.orderTransactionRepository.create({
        ...rest,
        amount: -amount,
        status: ORDER_TRANSACTION_STATUS_ENUM.CANCEL,
      });

      await queryRunner.manager.save(afterCancelOrder);
      await queryRunner.commitTransaction();
      return afterCancelOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
