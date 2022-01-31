import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeInput } from './dto/createCoffee.input';
import { Coffee } from './entities/coffee.entity';

@Resolver()
export class CoffeeResolver {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Query(() => [Coffee])
  fetchCoffees(): Coffee[] {
    return this.coffeeService.findAll();
  }

  @Mutation(() => String)
  createStarbucks(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ): string {
    return this.coffeeService.create({
      createCoffeeInput,
    });
  }
}
