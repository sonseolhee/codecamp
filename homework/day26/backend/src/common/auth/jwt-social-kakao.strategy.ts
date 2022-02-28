import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('💛 Profile', profile);
    console.log(
      '💛 _json.kakao_account.email',
      profile._json.kakao_account.email,
    );
    return {
      email: profile._json.kakao_account.email,
      name: profile.displayName,
      password: profile.id,
    };
  }
}
 