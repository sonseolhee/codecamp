import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
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

    private readonly connection: Connection,
  ) {}

  async create({ impUid, amount, currentUser }) {
    //트랜잭션 처리
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 1. pointTransaction 테이블에 거래기록 생성
      const pointTransaction = await this.pointTransactionRepository.create({
        impUid: impUid,
        amount: amount,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      // await this.pointTransactionRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction);

      //테스트용 ERROR
      // throw new Error();

      // 2. 유저정보 조회
      const user = await this.userRepository.findOne({ id: currentUser.id });

      // 3. 유저의 돈 업뎃
      // await this.userRepository.update({ id: user.id },{ point: user.point + amount });
      const updatedUser = await this.userRepository.create({
        ...user,
        point: user.point + amount,
      });

      await queryRunner.manager.save(updatedUser);
      await queryRunner.commitTransaction();

      //최종결과 돌려주기
      return pointTransaction;
    } catch (error) {
      //임시저장데이터 롤백
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
