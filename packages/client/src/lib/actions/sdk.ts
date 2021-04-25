import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

/** 账户 */
export type Account = {
  __typename?: 'Account'
  id: Scalars['Int']
  userId: Scalars['Int']
  name: Scalars['String']
  /** 账户余额 */
  balance: Scalars['Float']
  /** 账户类型 */
  type: AccountType
  createAt: Scalars['DateTime']
  updateAt: Scalars['DateTime']
}

/** 账户类型 */
export enum AccountType {
  Payment = 'Payment',
  Credit = 'Credit',
  Assets = 'Assets',
}

export type Mutation = {
  __typename?: 'Mutation'
  signUp: UserInfo
}

export type MutationSignUpArgs = {
  input: UserCreateInput
}

export type Query = {
  __typename?: 'Query'
  auth: UserAuthResult
}

export type QueryAuthArgs = {
  username: Scalars['String']
  password: Scalars['String']
}

/** 空间 */
export type Space = {
  __typename?: 'Space'
  id: Scalars['Int']
  name: Scalars['String']
  createAt: Scalars['DateTime']
  updateAt: Scalars['DateTime']
}

/** 交易记录 */
export type Transaction = {
  __typename?: 'Transaction'
  id: Scalars['Int']
  /** 创建者 */
  creatorId: Scalars['Int']
  /** 所属空间 */
  spaceId: Scalars['Int']
  /** 付款账户 */
  paymentAccountId?: Maybe<Scalars['Int']>
  /** 收款账户/债务账户 */
  receivingAccountId?: Maybe<Scalars['Int']>
  /** 类别 */
  categoryId: Scalars['Int']
  /** 交易类型 */
  type: TransactionType
  /** 金额/本金 */
  amount: Scalars['Float']
  /** 还款利息 */
  interest?: Maybe<Scalars['Float']>
  /** 交易时间 */
  date: Scalars['DateTime']
  /** 说明 */
  description?: Maybe<Scalars['String']>
  createAt: Scalars['DateTime']
  updateAt: Scalars['DateTime']
}

/** 交易类型 */
export enum TransactionType {
  Payment = 'Payment',
  Income = 'Income',
  Transfer = 'Transfer',
  Debt = 'Debt',
}

export type UserAuthResult = {
  __typename?: 'UserAuthResult'
  accessToken: Scalars['String']
}

export type UserCreateInput = {
  username: Scalars['String']
  password: Scalars['String']
  nickname: Scalars['String']
}

export type UserInfo = {
  __typename?: 'UserInfo'
  accounts: Account
  spaces: Space
  transaction: Transaction
  nickname: Scalars['String']
  username: Scalars['String']
  password?: Maybe<Scalars['String']>
}

export type AuthQueryVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type AuthQuery = { __typename?: 'Query' } & {
  auth: { __typename?: 'UserAuthResult' } & Pick<UserAuthResult, 'accessToken'>
}

export const AuthDocument = gql`
  query auth($username: String!, $password: String!) {
    auth(username: $username, password: $password) {
      accessToken
    }
  }
`

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    auth(
      variables: AuthQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<AuthQuery> {
      return withWrapper(() =>
        client.request<AuthQuery>(AuthDocument, variables, requestHeaders)
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
