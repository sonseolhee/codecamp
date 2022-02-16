import { InputType, OmitType } from '@nestjs/graphql';
import { Coupon } from '../entities/coupon.entity';

@InputType()
export class UpdateCouponInput extends OmitType(Coupon, ['id'], InputType) {}
