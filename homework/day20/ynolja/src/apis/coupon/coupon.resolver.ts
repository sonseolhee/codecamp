import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CouponService } from './coupon.service';
import { CreateCouponInput } from './dto/createCoupon.input';
import { UpdateCouponInput } from './dto/updateCoupon.input';
import { Coupon } from './entities/coupon.entity';

@Resolver()
export class CouponResolver {
  constructor(private readonly couponService: CouponService) {}

  @Query(() => [Coupon])
  async fetchCouponList() {
    return await this.couponService.findAll();
  }

  @Query(() => Coupon)
  async fetchCoupon(@Args('couponId') couponId: string) {
    return await this.couponService.findOne({ couponId });
  }

  @Mutation(() => Coupon)
  async createCoupon(
    @Args('createCouponInput') createCouponInput: CreateCouponInput,
  ) {
    return await this.couponService.create({ createCouponInput });
  }

  @Mutation(() => Coupon)
  async updateCoupon(
    @Args('couponId') couponId: string,
    @Args('updateCouponInput') updateCouponInput: UpdateCouponInput,
  ) {
    return await this.couponService.update({ couponId, updateCouponInput });
  }

  @Mutation(() => Boolean)
  async deleteCoupon(@Args('couponId') couponId: string) {
    return await this.couponService.delete({ couponId });
  }
}
