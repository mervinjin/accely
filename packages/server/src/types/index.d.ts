import { PrismaClient } from '@prisma/client'

declare global {
  interface ContextType {
    prisma: PrismaClient
  }
}
