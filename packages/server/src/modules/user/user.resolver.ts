import { AuthenticationError, ForbiddenError } from 'apollo-server'
import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { jwt } from '@/utils/jwt'
import { crypt } from '@/utils/crypt'
import {
  UserCreateInput,
  UserAuthArgs,
  UserAuthResult,
  UserInfo,
} from './user.type'

@Resolver()
export class UserResolver {
  @Query(() => UserAuthResult)
  async auth(
    @Args() input: UserAuthArgs,
    @Ctx() context: ContextType
  ): Promise<{ accessToken: string }> {
    const { username, password } = input
    const { prisma } = context
    const user = await prisma.user.findUnique({ where: { username } })

    if (user) {
      console.log(
        user,
        await crypt.compare(password, user.password),
        await crypt.compare(user.password, password)
      )
    }

    if (!user || !(await crypt.compare(password, user.password))) {
      throw new AuthenticationError('账号或密码错误')
    }

    const accessToken = jwt.sign(user)
    return { accessToken }
  }

  @Mutation(() => UserInfo)
  async signUp(
    @Arg('input') input: UserCreateInput,
    @Ctx() { prisma }: ContextType
  ): Promise<UserInfo> {
    const existUser = await prisma.user.findUnique({
      where: { username: input.username },
    })

    if (existUser) {
      throw new ForbiddenError('用户名已存在')
    }

    const newUser = (await prisma.user.create({
      data: { ...input, password: await crypt.hash(input.password) },
    })) as UserInfo

    delete newUser.password
    return newUser
  }
}
