import { PrismaClient } from '@prisma/client'

declare global {
  interface JWTUser {
    id: number
    username: string
  }

  interface ContextType {
    prisma: PrismaClient
    user: JWTUser | null
  }
}
