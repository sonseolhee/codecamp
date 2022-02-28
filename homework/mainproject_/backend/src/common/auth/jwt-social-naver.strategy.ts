import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-naver-v2';

@Injectable()
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLINET_ID,
      clientSecret: process.env.NAVER_CLINET_SECRET,
      callbackURL: 'http://localhost:3000/login/naver/callback',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('💛 Profile', profile);
    return {
      provider: profile.provider,
      email: profile.email,
      name: profile.name,
      password: profile.id,
      phoneNumber: profile.mobile,
    };
  }
}
 