import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   autoSchemaFile: 'src/common/graphql/schema.gql',
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my_database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'yanolja',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
