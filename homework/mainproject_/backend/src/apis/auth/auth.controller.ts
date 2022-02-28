import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Interface } from 'readline';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

export interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'phoneNumber'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService,
  ) {}

  // async socialLogin(req: Request & IOAuthUser, res: Response) {
  //   let user = await this.userService.findOneForLogin({
  //     email: req.user.email,
  //   });
  //   console.log('💛 Before Create user', user);
  //   if (!user) {
  //     const createUserInput = req.user;
  //     user = await this.userService.create({ createUserInput });
  //     console.log('💛 After Create user', user);
  //   }
  //   this.authService.setRefreshToken({ user, res });
  //   console.log(`💛 Authservice RefreshToken 받아오기 성공`);
  //   res.redirect(
  //     'http://localhost:5501/homework/day22/main-project/frontend/login/index.html',
  //   );
  // }

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    await this.authService.socialLogin(req, res);
  }

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    await this.authService.socialLogin(req, res);
  }

  @Get('/login/naver/callback')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    await this.authService.socialLogin(req, res);
  }
}
