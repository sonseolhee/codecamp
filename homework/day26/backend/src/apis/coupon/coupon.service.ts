import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  async findAll() {
    return await this.couponRepository.find();
  }

  async findOne({ couponId }) {
    return await this.couponRepository.findOne({ id: couponId });
  }

  async create({ createCouponInput }) {
    return await this.couponRepository.save({ ...createCouponInput });
  }

  async update({ couponId, updateCouponInput }) {
    const coupon_ = this.couponRepository.findOne({ id: couponId });
    const updateCoupon = {
      ...coupon_,
      ...updateCouponInput,
    };
    return await this.couponRepository.save(updateCoupon);
  }

  async delete({ couponId }) {
    const result = await this.couponRepository.softDelete({ id: couponId });
    return result.affected ? true : false;
  }
}
