import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { IOAuthUser } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    console.log('π refreshToken ', res);
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }

  async socialLogin(req, res) {
    let user = await this.userService.findOneForLogin({
      email: req.user.email,
    });
    console.log('π Before Create user', user);
    if (!user) {
      const createUserInput = req.user;
      user = await this.userService.create({ createUserInput });
      console.log('π After Create user', user);
    }
    this.setRefreshToken({ user, res });
    console.log(`π Authservice RefreshToken λ°μμ€κΈ° μ±κ³΅`);
    res.redirect(
      'http://localhost:5501/homework/day22/main-project/frontend/login/index.html',
    );
  }
}
