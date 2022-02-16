import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponResolver } from './coupon.resolver';
import { CouponService } from './coupon.service';
import { Coupon } from './entities/coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  providers: [
    CouponResolver, //
    CouponService,
  ],
})
export class CouponModule {}
