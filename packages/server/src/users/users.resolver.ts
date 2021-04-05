import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { CreateUserArgs, AuthArgs, User } from './users.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async auth(@Args() args: AuthArgs) {
    const user = await this.usersService.auth(args);

    if (!user) {
      throw new AuthenticationError('账户或密码错误');
    }

    // TODO: 生成 TOKEN

    return user;
  }

  @Mutation(() => User, { nullable: true })
  async createUser(
    @Args()
    args: CreateUserArgs,
  ) {
    return this.usersService.create(args);
  }
}
