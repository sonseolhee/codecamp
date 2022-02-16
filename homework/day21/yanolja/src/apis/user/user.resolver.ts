import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt'
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guards';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { UpdatePasswordInput } from './dto/updateUserPassword.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async fetchUserList() {
    return await this.userService.findAll();
  }

  // @Query(() => User)
  // async fetchUser(@Args('email') email: string) {
  //   return await this.userService.findOne({ email });
  // } 

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchUser(@CurrentUser() currentUser: ICurrentUser){
    console.log(" 💛 " + currentUser.email, currentUser.id)
    const userId = currentUser.id
    return await this.userService.findOne( { userId } )
  }
  
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10)
    createUserInput = {...createUserInput, password: hashedPassword}
    return await this.userService.create({ createUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async updateUserPassword(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('updatePasswordInput') updatePasswordInput: UpdatePasswordInput
  ){
    const userId = currentUser.id
    console.log(" 💛 " + updatePasswordInput.password)
    const hassedUpdatePassword = await bcrypt.hash(updatePasswordInput.password, 10)

    await this.userService.modifyPassword({ userId, hassedUpdatePassword })
    return "비밀번호 변경 성공"
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userId') userId: string, 
    @Args('updateUserId') updateUserInput: UpdateUserInput,
  ) {
    // console.log(updateUserInput)
    return await this.userService.update({ userId, updateUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteUser(@CurrentUser() currentUser: ICurrentUser) {
    const userId = currentUser.id
    return await this.userService.delete({ userId });
  }
}
