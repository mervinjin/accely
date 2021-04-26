import { nanoid } from 'nanoid'
import faker from 'faker'
import { jwt } from '@/utils/jwt'
import { getContext, prisma } from '@/test-utils/setup'
import { createUser } from '@/test-utils/data-generator'
import { UserResolver } from './user.resolver'

const userResolver = new UserResolver()

function auth(username: string, password: string) {
  return userResolver.auth({ username, password }, getContext())
}

describe('User resolver', () => {
  describe('auth()', () => {
    it('should failed', async () => {
      // 用户密码不匹配
      await expect(auth(nanoid(), nanoid())).rejects.toThrow()
    })

    it('should pass', async () => {
      const password = nanoid()
      const user = await createUser({ password })
      await expect(auth(user.username, password)).resolves.toEqual({
        accessToken: jwt.sign(user),
      })
    })
  })

  describe('signUp()', () => {
    it('should failed', async () => {
      const user = await createUser()
      const input = {
        username: user.username,
        password: user.password,
        nickname: user.nickname,
      }
      // 用户名已存在
      await expect(userResolver.signUp(input, getContext())).rejects.toThrow()
    })

    it('should success', async () => {
      const input = {
        nickname: faker.name.findName(),
        username: faker.name.firstName(),
        password: nanoid(),
      }
      const { accessToken } = await userResolver.signUp(input, getContext())
      const user = await prisma.user.findUnique({
        where: { username: input.username },
      })

      // 成功创建用户
      expect(user).toBeTruthy()

      const space = await prisma.space.findFirst({
        where: { users: { some: { username: user!.username } } },
      })

      // 返回正确的 token
      expect(accessToken).toEqual(jwt.sign(user!))
      // 记录用户名
      expect(user).toHaveProperty('nickname', input.nickname)
      // crypt
      expect(user!.password).not.toEqual(input.password)
      // 创建默认的私有空间
      expect(space).toBeTruthy()
    })
  })
})
