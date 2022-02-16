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

  async create({ email, password, name, age }) {
    const userEmail = await this.userRepository.findOne({ email });
    if (userEmail) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }
    return await this.userRepository.save({ email, password, name, age });
  }
}
 