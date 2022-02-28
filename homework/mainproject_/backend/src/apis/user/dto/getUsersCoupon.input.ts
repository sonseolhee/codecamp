import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetUsersCouponInput {
  @Field(() => String)
  usersCouponId: string;
}
