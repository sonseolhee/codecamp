import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/common/auth/gql-auth.guards";
import { CurrentUser, ICurrentUser } from "src/common/auth/gql-user.param";
import { OrderTransaction } from "./entities/orderTransaction.entity";
import { OrderTransactionService } from "./orderTransaction.service";

@Resolver()
export class OrderTransactionResolver {
  
  constructor(
    private readonly orderTransactionService: OrderTransactionService,//
  ){}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => OrderTransaction)
  async createOrderTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
    @Args('roomId') roomId: string,
    @Args('checkInDate') checkInDate: Date,
    @Args('checkOutDate') checkOutDate: Date,
  ){
    return await this.orderTransactionService.create({ 
      impUid, 
      amount, 
      currentUser, 
      roomId, 
      checkInDate, 
      checkOutDate
    })
  }

}


