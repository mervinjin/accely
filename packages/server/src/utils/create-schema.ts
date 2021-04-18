import { buildSchema } from 'type-graphql'
import { authChecker } from './auth-checker'

export function createSchema() {
  return buildSchema({
    resolvers: [__dirname + '/../**/*.resolver.ts'],
    authChecker,
  })
}
