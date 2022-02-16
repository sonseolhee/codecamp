import { Field, InputType, OmitType } from '@nestjs/graphql';
import { PlaceTag } from 'src/apis/placeTag/entities/placeTag.entity';

@InputType()
export class CreatePlaceInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  address: string;

  @Field(() => [String])
  placeTags: string[];
}
