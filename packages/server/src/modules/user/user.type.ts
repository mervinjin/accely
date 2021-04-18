import { ArgsType, Field, ObjectType } from 'type-graphql'
import { User } from '@prisma/client'

@ArgsType()
export class UserAuthArgs implements Partial<User> {
  @Field(() => String)
  username: string
  @Field(() => String)
  password: string
}

@ObjectType()
export class UserAuthResult {
  @Field(() => String)
  accessToken: string
}
