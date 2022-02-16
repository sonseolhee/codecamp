import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>, //
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ impUid, amount, currentUser }) {
    const pointTransaction = await this.pointTransactionRepository.create({
      impUid: impUid,
      amount: amount,
      user: currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });

    // 1. pointTransaction 테이블에 거래기록 생성
    await this.pointTransactionRepository.save(pointTransaction);

    // 2. 유저정보 조회
    const user = await this.userRepository.findOne({ id: currentUser.id });

    // 3. 유저의 돈 업뎃
    await this.userRepository.update(
      { id: user.id },
      { point: user.point + amount },
    );

    //최종결과 돌려주기
    return pointTransaction;
  }
}
