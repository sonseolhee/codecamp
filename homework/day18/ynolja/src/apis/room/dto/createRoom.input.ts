import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int, { nullable: true })
  inventory: number;

  @Field(() => Int, { nullable: true })
  basicPeopleNumber: number;

  @Field(() => Int, { nullable: true })
  maxPeopleNumber: number;

  @Field(() => Int)
  price: number;

  @Field(() => Date, { nullable: true })
  checkInDate: Date;

  @Field(() => Date, { nullable: true })
  checkOutDate: Date;
}
