import faker from 'faker'
import { nanoid } from 'nanoid'
import { prisma } from './setup'

export function createUser() {
  return prisma.user.create({
    data: {
      nickname: faker.name.lastName(),
      username: faker.name.firstName(),
      password: nanoid(),
    },
  })
}
