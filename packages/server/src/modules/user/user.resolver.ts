import { AuthenticationError, ForbiddenError } from 'apollo-server'
import { Args, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { jwt } from '@/utils/jwt'
import { crypt } from '@/utils/crypt'
import { UserAuthInput, UserAuthResult } from './user.type'

@Resolver()
export class UserResolver {
  @Query(() => String)
  test() {
    return '1'
  }

  @Mutation(() => UserAuthResult)
  async signIn(
    @Args() input: UserAuthInput,
    @Ctx() context: ContextType
  ): Promise<{ accessToken: string }> {
    const { username, password } = input
    const { prisma } = context
    const user = await prisma.user.findUnique({ where: { username } })

    if (!user || !(await crypt.compare(password, user.password))) {
      throw new AuthenticationError('账号或密码错误')
    }

    const accessToken = jwt.sign(user)
    return { accessToken }
  }

  @Mutation(() => UserAuthResult)
  async signUp(
    @Args() input: UserAuthInput,
    @Ctx() { prisma }: ContextType
  ): Promise<UserAuthResult> {
    const { username, password } = input

    const existUser = await prisma.user.findUnique({
      where: { username: username },
    })

    if (existUser) {
      throw new ForbiddenError('用户名已存在')
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        password: await crypt.hash(password),
        spaces: { create: { name: username } },
      },
    })

    const accessToken = jwt.sign(newUser)
    return { accessToken }
  }
}
