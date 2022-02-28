import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRoomImageInput {
  @Field(() => [String])
  urls: string[];

  @Field(() => [Boolean], { nullable: true })
  isMain: boolean[];

  @Field(() => String)
  roomId: string;
}
