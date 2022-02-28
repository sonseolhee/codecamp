import { Field, InputType, Int } from '@nestjs/graphql';
import { UsagetypeInput } from 'src/apis/usagetype/dto/usagetype.input';

@InputType()
export class CreateRoomInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int, { nullable: true })
  inventory?: number;

  @Field(() => Int, { nullable: true })
  basicPeopleNumber?: number;

  @Field(() => Int, { nullable: true })
  maxPeopleNumber?: number;

  @Field(() => Int)
  price: number;

  @Field(() => UsagetypeInput)
  roomUsagetype: UsagetypeInput;

  @Field(() => String)
  roomPlaceId: string;
}
