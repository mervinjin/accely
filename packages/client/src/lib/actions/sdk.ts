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
}

export type Mutation = {
  __typename?: 'Mutation'
  signIn: UserAuthResult
  signUp: UserAuthResult
}

export type MutationSignInArgs = {
  username: Scalars['String']
  password: Scalars['String']
}

export type MutationSignUpArgs = {
  username: Scalars['String']
  password: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  test: Scalars['String']
}

export type UserAuthResult = {
  __typename?: 'UserAuthResult'
  accessToken: Scalars['String']
}

export type SignInMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type SignInMutation = { __typename?: 'Mutation' } & {
  signIn: { __typename?: 'UserAuthResult' } & Pick<
    UserAuthResult,
    'accessToken'
  >
}

export type SignUpMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type SignUpMutation = { __typename?: 'Mutation' } & {
  signUp: { __typename?: 'UserAuthResult' } & Pick<
    UserAuthResult,
    'accessToken'
  >
}

export const SignInDocument = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      accessToken
    }
  }
`
export const SignUpDocument = gql`
  mutation signUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
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
    signIn(
      variables: SignInMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<SignInMutation> {
      return withWrapper(() =>
        client.request<SignInMutation>(
          SignInDocument,
          variables,
          requestHeaders
        )
      )
    },
    signUp(
      variables: SignUpMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<SignUpMutation> {
      return withWrapper(() =>
        client.request<SignUpMutation>(
          SignUpDocument,
          variables,
          requestHeaders
        )
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
