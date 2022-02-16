import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Room } from "../room/entities/room.entity";
import { User } from "../user/entities/user.entity";
import { OrderTransaction } from "./entities/orderTransaction.entity";
import { OrderTransactionResolver } from "./orderTransaction.resolver";
import { OrderTransactionService } from "./orderTransaction.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderTransaction,//
      User,
      Room
    ])
  ],
  providers: [
    OrderTransactionResolver,
    OrderTransactionService
  ]
})
export class OrderTransactionModule {

}
