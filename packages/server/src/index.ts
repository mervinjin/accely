import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { resolvers } from '@generated/type-graphql'
import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
// import { verify } from 'jsonwebtoken'

const PORT = process.env.PORT || 4000
async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [resolvers[1]],
  })

  const prisma = new PrismaClient()
  const server = new ApolloServer({
    schema,
    playground: true,
    context({ req }): ContextType {
      // const token: string = req.headers.authorization || ''
      // // const user = verify('11', process.env.JWT_SECRET)
      // // console.log(user)
      return { prisma }
    },
  })

  const { url } = await server.listen(PORT)

  console.log(`Server is running, GraphQL Payground available at ${url}`)
}

bootstrap()
