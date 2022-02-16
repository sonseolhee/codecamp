import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne({ userId }: { userId: string }) {
    return await this.userRepository.findOne({ id: userId });
  }

  async create({ createUserInput }) {
    const userEmail = await this.userRepository.findOne({
      email: createUserInput.email,
    });
    if (userEmail) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }
    return await this.userRepository.save({ ...createUserInput });
  }

  async update({ userId, updateUserInput }) {
    const user_ = await this.userRepository.findOne({ id: userId });
    const updateUser = {
      ...user_,
      ...updateUserInput,
    };
    return await this.userRepository.save(updateUser);
    // return await this.userRepository.update({ id: userId }, {...updateUserInput})
  }

  async delete({ userId }) {
    const result = await this.userRepository.softDelete({ id: userId });
    return result.affected ? true : false;
  }

  // 각자 해당되는 조건의 [쿠폰 다운로드] 버튼 눌렀을때 ???
  // async getCouponDownload({ GetUsersCouponInput }) {}
}
