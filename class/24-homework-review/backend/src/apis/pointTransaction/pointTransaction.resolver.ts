import { HttpException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionService } from './pointTransaction.service';
import axios from 'axios';
import { IamportService } from '../iamport/iamport.service';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService,
    private readonly iamportService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  async createPointTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    //검증로직
    //1. 아임포트에 요청해서 결제 완료 기록이 존재하는지 확인한다. (아임포트 API 요청)
    const access_token = await this.iamportService.getToken();

    //2. pointTransaction 테이블에는 impUid가 1번만 존재해야 한다. (같은 impUid로 중복 결제하는 것을 방지)
    this.iamportService.checkPaid({ imp_uid: impUid, access_token });
    // return await this.pointTransactionService.create({
    //   impUid,
    //   amount,
    //   currentUser,
    // });
  }
}
