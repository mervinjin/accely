import 'reflect-metadata'
import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

config()

interface GetContextArgs {
  user?: ContextType['user']
}

export let prisma: PrismaClient

export function getContext({ user }: GetContextArgs = {}): ContextType {
  return { user: user ?? null, prisma }
}

beforeAll(async () => {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.TEST_DATABASE_URL,
      },
    },
  })

  const users = await prisma.user.findMany()

  if (users.length) {
    throw new Error('数据库中存在数据，无法用于测试')
  }
})

afterAll(async () => {
  await prisma.$disconnect()
})
