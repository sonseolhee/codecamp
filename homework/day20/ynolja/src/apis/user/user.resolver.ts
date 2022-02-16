import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async fetchUserList() {
    return await this.userService.findAll();
  }

  @Query(() => User)
  async fetchUser(@Args('userId') userId: string) {
    return await this.userService.findOne({ userId });
  } 

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create({ createUserInput });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userId') userId: string,
    @Args('updateUserId') updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.update({ userId, updateUserInput });
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('userId') userId: string) {
    return await this.userService.delete({ userId });
  }
}
