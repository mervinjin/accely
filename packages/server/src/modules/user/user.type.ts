import { MinLength } from 'class-validator'
import { ArgsType, Field, ObjectType } from 'type-graphql'
import { Account, Space, Transaction } from '@generated/type-graphql'

@ObjectType()
export class UserExtraInfo {
  /** 账户信息 */
  @Field(() => Account)
  accounts?: Account[]
  /** 空间信息 */
  @Field(() => Space)
  spaces?: Space[]
  /** 交易信息 */
  @Field(() => Transaction)
  transaction?: Transaction[]
}

@ArgsType()
export class UserAuthInput {
  @Field(() => String)
  @MinLength(6)
  username: string
  @Field(() => String)
  @MinLength(6)
  password: string
}

@ObjectType()
export class UserAuthResult {
  @Field(() => String)
  accessToken: string
}
