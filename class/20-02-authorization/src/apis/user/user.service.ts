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

  async findOne({ email }) {
    return await this.userRepository.findOne({ email });
  }

  async create({ email, hashedPassword: password, name, age }) {
    const userEmail = await this.userRepository.findOne({ email });
    if (userEmail) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }
    console.log(password);

    return await this.userRepository.save({ email, password, name, age });
  }
}
