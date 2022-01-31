import { Module } from '@nestjs/common';
import { CoffeeResolver } from './coffee.resolver';
import { CoffeeService } from './coffee.service';

@Module({
  //   imports: [],
  //   controllers: [AppController],
  providers: [CoffeeResolver, CoffeeService],
})
export class CoffeeModule {}
