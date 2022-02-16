import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponModule } from './apis/coupon/coupon.module';
import { OrderModule } from './apis/order/order.module';
import { PlaceModule } from './apis/place/place.module';
import { RoomModule } from './apis/room/room.module';
import { UsagetypeModule } from './apis/usagetype/usagetype.module';
import { UserModule } from './apis/user/user.module';

@Module({
  imports: [
    PlaceModule,
    RoomModule,
    UsagetypeModule,
    UserModule,
    OrderModule,
    CouponModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/common/graphql/schema.gql',
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
