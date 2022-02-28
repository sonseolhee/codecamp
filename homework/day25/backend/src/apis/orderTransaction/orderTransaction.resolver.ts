import { HttpException, Res, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guards';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { IamportService } from '../iamport/iamport.service';
import { Room } from '../room/entities/room.entity';
import { OrderTransaction } from './entities/orderTransaction.entity';
import { OrderTransactionService } from './orderTransaction.service';

@Resolver()
export class OrderTransactionResolver {
  constructor(
    private readonly orderTransactionService: OrderTransactionService, //
    private readonly iamportService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => OrderTransaction)
  async createOrderTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser, 
    @Args('roomId') roomId: string,
    @Args('checkInDate') checkInDate: Date,
    @Args('checkOutDate') checkOutDate: Date,
  ) {

    //step1 : 아임포트에 결제완료 기록 여부 확인
    const impAccessToken = await this.iamportService.getIamportAccessToken();
    await this.iamportService.checkPayment({ impUid, amount, impAccessToken}) 
 
    //step2 : orderTransaction 테이블에 impUid가 1번만 존재하는지 확인 + 금액이 정확한지 확인
    // await this.orderTransactionService.checkDuplicateOrder({ impUid })
 
    return await this.orderTransactionService.create({
      impUid,
      amount,
      currentUser,
      roomId,
      checkInDate,
      checkOutDate,
     });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => OrderTransaction)
  async cancelOrder(
    @Args('impUid') impUid: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {

    await this.orderTransactionService.checkAlreadyCancel({ impUid })
    await this.orderTransactionService.checkProperUserTryingtoCancel({ impUid, currentUser })
    const accessToken = await this.iamportService.getIamportAccessToken();
    const canceledAmount = await this.iamportService.cancelPayment({ impUid, accessToken });

    return await this.orderTransactionService.cancel({
      impUid,
      amount: canceledAmount,
    });
  }
}
