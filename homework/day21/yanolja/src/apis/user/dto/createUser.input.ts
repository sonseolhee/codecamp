import { Field, InputType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends OmitType(User, ['id'], InputType) {

  @Field(() => String)
  password: string;
  
}
