import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import { jwt } from '@/utils/jwt'
import { createSchema } from '@/utils/create-schema'

const PORT = process.env.PORT || 4000

async function bootstrap() {
  const schema = await createSchema()
  const prisma = new PrismaClient()
  const server = new ApolloServer({
    schema,
    playground: true,
    cors: true,
    context({ req }): ContextType {
      const token: string = req.headers.authorization || ''
      const user = jwt.verify(token)
      return { prisma, user }
    },
  })

  const { url } = await server.listen(PORT)
  console.log(`Server is running, GraphQL Playground available at ${url}`)
}

bootstrap()
