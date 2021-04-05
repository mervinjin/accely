import { UserResolver } from '@/modules/user/user.resolver'
import { buildSchema } from 'type-graphql'
import { authChecker } from './auth-checker'

export function createSchema() {
  return buildSchema({
    // 这里如果使用 globs 导入 resolvers，会把 prisma 解析出到所有 resolver 一起导入
    resolvers: [UserResolver],
    authChecker,
  })
}
