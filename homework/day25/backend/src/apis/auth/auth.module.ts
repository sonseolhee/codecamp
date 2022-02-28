import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtRefreshStrategy } from 'src/common/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from 'src/common/auth/jwt-social-google.strategy';
import { JwtKakaoStrategy } from 'src/common/auth/jwt-social-kakao.strategy';
import { JwtNaverStrategy } from 'src/common/auth/jwt-social-naver.strategy';
import { User } from '../user/entities/user.entity';
import { UserResolver } from '../user/user.resolver';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  providers: [
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtKakaoStrategy,
    JwtNaverStrategy,
    AuthResolver,
    AuthService,
    UserService,
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
