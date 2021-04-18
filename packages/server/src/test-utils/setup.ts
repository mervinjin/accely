import 'reflect-metadata'
import { PrismaClient } from '@prisma/client'

interface GetContextArgs {
  user?: ContextType['user']
}

export let prisma: PrismaClient

export function getContext({ user }: GetContextArgs = {}): ContextType {
  return { user: user ?? null, prisma }
}

beforeAll(async () => {
  prisma = new PrismaClient()
})

afterAll(async () => {
  prisma.$disconnect()
})
