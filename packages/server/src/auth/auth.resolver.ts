import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { Public } from './auth.decorator';
import { AuthArgs, AuthResult } from './auth.model';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AuthResult, { nullable: true })
  @Public()
  async auth(@Args() args: AuthArgs) {
    const user = await this.authService.validate(args.username, args.password);

    if (!user) {
      throw new AuthenticationError('账户或密码错误');
    }

    return this.authService.sign(user);
  }
}
