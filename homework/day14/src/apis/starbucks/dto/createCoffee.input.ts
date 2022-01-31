import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCoffeeInput {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  price: number;

  @Field(() => Number)
  kcal: number;

  @Field(() => Number)
  fat: number;

  @Field(() => Number)
  protein: number;

  @Field(() => Number)
  salt: number;

  @Field(() => Number)
  sugar: number;

  @Field(() => Number)
  caffeine: number;
}
