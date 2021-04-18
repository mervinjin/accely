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
  if (!process.env.TEST_DATABASE_URL) {
    throw new Error('未配置测试数据（process.env.TEST_DATABASE_URL）!')
  }

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
  await prisma.account.deleteMany()
  await prisma.space.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.user.deleteMany()
  await prisma.$disconnect()
})
