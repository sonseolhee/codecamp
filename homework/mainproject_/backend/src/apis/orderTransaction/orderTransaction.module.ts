import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamportService } from '../iamport/iamport.service';
import { Room } from '../room/entities/room.entity';
import { User } from '../user/entities/user.entity';
import { OrderTransaction } from './entities/orderTransaction.entity';
import { OrderTransactionResolver } from './orderTransaction.resolver';
import { OrderTransactionService } from './orderTransaction.service';

@Module({
  imports: [
    // HttpModule, 
    TypeOrmModule.forFeature([
      OrderTransaction, //
      User,
      Room,
    ]), 
  ],
  providers: [OrderTransactionResolver, OrderTransactionService, IamportService],
})
export class OrderTransactionModule {}
