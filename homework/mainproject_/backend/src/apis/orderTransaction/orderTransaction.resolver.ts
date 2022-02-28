import { Res, UnprocessableEntityException, UseGuards } from '@nestjs/common';
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
    @Args('amount') amount_: number,
    @CurrentUser() currentUser: ICurrentUser,
    @Args('roomId') roomId: string,
    @Args('checkInDate') checkInDate: Date,
    @Args('checkOutDate') checkOutDate: Date,
  ) {
    const access_token = await this.iamportService.getIamportAccessToken();
    const getPaymentData = await this.iamportService.getPaymentData({
      impUid,
      access_token,
    });
    if (getPaymentData.data.code !== 0) {
      throw new UnprocessableEntityException('💛 유효하지 않은 아이디');
    }

    return await this.orderTransactionService.create({
      getPaymentData,
      currentUser,
      roomId,
      checkInDate,
      checkOutDate,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async cancelOrder(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    // @Args('roomId') roomId: Room,
    // @Args('reason') reason: string,
  ) {
    const access_token = await this.iamportService.getIamportAccessToken();
    const cancelResult = await this.iamportService.cancelPayment({
      impUid,
      amount,
      access_token,
    });
    console.log('💛 CancelResult.Data', cancelResult.data);
    // const cancelData = cancelResult.data

    return await this.orderTransactionService.cancel({
      impUid,
      amount,
      currentUser,
      // roomId,
    });
  }
}
