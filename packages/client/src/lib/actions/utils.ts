import { getToken } from '$lib/utils/token'
import { GraphQLClient } from 'graphql-request'
import { message } from '$lib/components/message'
import { getSdk } from './sdk'

interface GraphqlError {
  response: {
    errors: { message: string }[]
    data: null
  }
}

type Action<T, V> = (input: T, headers: HeadersInit | undefined) => Promise<V>

interface QueryOptions<V> {
  onSuccess?(value: V): void
}

function getHeaders() {
  const token = getToken()
  return {
    authorization: token ? `Bearer ${token}` : '',
  }
}

function isGraphqlError(error: unknown): error is GraphqlError {
  if ((error as GraphqlError)?.response?.errors) {
    return true
  }

  return false
}

function handleError(error: unknown): never {
  if (!isGraphqlError(error)) {
    throw error
  }

  const {
    response: { errors },
  } = error
  const errorMessage = errors?.[0]?.message

  if (errorMessage) {
    message.error(errorMessage)
  }

  throw errorMessage ?? error
}

export function query<T, V>(
  action: Action<T, V>,
  option?: QueryOptions<V>
): (input: T) => Promise<V> {
  return (input: T) =>
    action(input, getHeaders())
      .then(value => {
        option?.onSuccess?.(value)
        return value
      })
      .catch(handleError)
}

const endpoint = 'http://localhost:4001/'
const client = new GraphQLClient(endpoint)

export const clientSdk = getSdk(client)
