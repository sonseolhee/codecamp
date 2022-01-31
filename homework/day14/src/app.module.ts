import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeModule } from './apis/starbucks/coffee.module';
import { Coffee } from './apis/starbucks/entities/coffee.entity';

@Module({
  imports: [
    CoffeeModule, //
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/common/graphql/schema.gql',
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '1673',
    //   database: 'mysql',
    //   entities: [Coffee],
    //   synchronize: true,
    //   logging: true,
    // }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
