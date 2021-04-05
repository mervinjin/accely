import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserArgs, User } from './users.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { nullable: true })
  async createUser(
    @Args()
    args: CreateUserArgs,
  ) {
    return this.usersService.create(args);
  }
}
