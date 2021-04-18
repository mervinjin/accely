import { nanoid } from 'nanoid'
import { jwt } from '@/utils/jwt'
import { getContext } from '@/test-utils/setup'
import { createUser } from '@/test-utils/data-generator'
import { UserResolver } from './user.resolver'

const userResolver = new UserResolver()

function queryAuth(username: string, password: string) {
  return userResolver.auth({ username, password }, getContext())
}

describe('User resolver', () => {
  it('will failed on auth', async () => {
    await expect(queryAuth(nanoid(), nanoid())).rejects.toThrow(
      '账号或密码错误'
    )
  })

  it('will pass auth', async () => {
    const user = await createUser()
    await expect(queryAuth(user.username, user.password)).resolves.toEqual({
      accessToken: jwt.sign(user),
    })
  })
})
