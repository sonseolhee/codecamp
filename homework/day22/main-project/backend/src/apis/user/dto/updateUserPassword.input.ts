import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePasswordInput{

  @Field(() => String)
  password !: string
}
