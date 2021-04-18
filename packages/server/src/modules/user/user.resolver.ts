import { AuthenticationError } from 'apollo-server'
import { Args, Ctx, Query, Resolver } from 'type-graphql'
import { jwt } from '@/utils/jwt'
import { UserAuthArgs, UserAuthResult } from './user.type'

@Resolver()
export class UserResolver {
  @Query(() => UserAuthResult)
  async auth(@Args() args: UserAuthArgs, @Ctx() context: ContextType) {
    const { username, password } = args
    const { prisma } = context
    const user = await prisma.user.findUnique({ where: { username } })

    if (!user || user.password !== password) {
      throw new AuthenticationError('账号或密码错误')
    }

    const accessToken = jwt.sign(user)

    return { accessToken }
  }
}
