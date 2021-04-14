import 'reflect-metadata'

import { buildSchema } from 'type-graphql'
import { resolvers } from '@generated/type-graphql'
console.log('hello')

const schema = await buildSchema({
  resolvers: [...resolvers],
})
