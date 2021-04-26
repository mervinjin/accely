import { getToken, setToken } from '$lib/utils/token'
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

const endpoint = 'http://localhost:4001/'
const client = new GraphQLClient(endpoint)
const sdk = getSdk(client)

function getHeaders() {
  const token = getToken()
  return {
    authorization: token ? `Bearer ${token}` : '',
  }
}

function isGraphqlError(error: unknown): error is GraphqlError {
  if (typeof error !== 'object' || error === null) {
    return false
  }

  if ((error as GraphqlError).response?.errors) {
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

function query<T, V>(
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

export const auth = query(sdk.auth, {
  onSuccess: value => setToken(value.auth.accessToken),
})
