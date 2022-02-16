import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductSaleslocationInput } from 'src/apis/productSaleslocation/dto/productsaleslocation.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  price: number;

  @Field(() => ProductSaleslocationInput)
  productSaleslocation: ProductSaleslocationInput;
}
