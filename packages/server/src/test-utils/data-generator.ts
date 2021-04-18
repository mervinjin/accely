import faker from 'faker'
import { nanoid } from 'nanoid'
import { crypt } from '@/utils/crypt'
import { Prisma } from '@prisma/client'
import { prisma } from './setup'

export async function createUser(data: Partial<Prisma.UserCreateInput> = {}) {
  const { password = nanoid(), ...restData } = data

  return prisma.user.create({
    data: {
      nickname: faker.name.findName(),
      username: faker.name.firstName(),
      password: await crypt.hash(password),
      ...restData,
    },
  })
}
