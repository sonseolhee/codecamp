import { InputType, OmitType } from '@nestjs/graphql';
import { Coupon } from '../entities/coupon.entity';

@InputType()
export class CreateCouponInput extends OmitType(Coupon, ['id'], InputType) {}
