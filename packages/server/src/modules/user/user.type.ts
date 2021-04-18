import { MinLength } from 'class-validator'
import { ArgsType, Field, InputType, ObjectType } from 'type-graphql'
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

@ObjectType()
export class UserInfo extends UserExtraInfo {
  @Field(() => String)
  nickname: string
  @Field(() => String)
  username: string
  @Field(() => String, { nullable: true })
  password?: string
}

@ArgsType()
export class UserAuthArgs {
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

@InputType()
export class UserCreateInput {
  @Field(() => String)
  @MinLength(6)
  username: string

  @Field(() => String)
  @MinLength(6)
  password: string

  @Field(() => String)
  @MinLength(3)
  nickname: string
}
