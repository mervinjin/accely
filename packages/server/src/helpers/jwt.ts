import { User } from '.prisma/client'
import { sign, verify } from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET ?? 'vsBRuW598qQQzy3l9Lee6'

export const jwt = {
  sign(user: User) {
    const { password, ...safeData } = user
    const token = sign(safeData, secretKey)
    return token
  },
  verify(token: string | undefined): JWTUser | null {
    if (!token) {
      return null
    }

    try {
      return verify(token, secretKey) as JWTUser
    } catch {
      return null
    }
  },
}
