import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/creatProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async fetchProductList() {
    return await this.productService.findAll();
  }

  @Query(() => Product)
  async fetchProduct(@Args('productId') productId: string) {
    return await this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return await this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    await this.productService.checkSoldOut({ productId });

    return await this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean) 
  async deleteProduct(@Args('productId') productId: string) {
    return await this.productService.delete({ productId });
  }
}
