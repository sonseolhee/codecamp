import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { CouponModule } from './apis/coupon/coupon.module';
import { PlaceModule } from './apis/place/place.module';
import { RoomModule } from './apis/room/room.module';
import { UsagetypeModule } from './apis/usagetype/usagetype.module';
import { UserModule } from './apis/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { OrderTransactionModule } from './apis/orderTransaction/orderTransaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AuthModule,
    PlaceModule,
    RoomModule,
    UsagetypeModule,
    OrderTransactionModule,
    UserModule,
    CouponModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
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
