import {
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { GqlAuthRefreshGuard } from 'src/common/auth/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => String) 
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: any, //req, res, header info..
  ) {
    // 1. 이메일과 비밀번호가 맞는 유저 찾기
    const user = await this.userService.findOne({ email });
    if (!user)
      throw new UnprocessableEntityException('이메일이 존재하지 않습니다.');

    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    console.log('💛 req', context.req);
    console.log('💛 res', context.res);

    // 2. refreshToken(JWT)을 만들어서 프론트엔드(쿠기)에 보내주기
    this.authService.setRefreshToken({ user, res: context.res });

    // 3. accessToken(JWT) 만들어서 프론트엔드에 보내주기
    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(@CurrentUser() currentUser: ICurrentUser) {
    return this.authService.getAccessToken({ user: currentUser });
  }
}
