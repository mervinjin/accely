import { getToken, setToken } from '$lib/utils/token'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from './sdk'

const endpoint = 'http://localhost:4001/'
const client = new GraphQLClient(endpoint)
const sdk = getSdk(client)

function getHeaders() {
  const token = getToken()
  return {
    authorization: token ? `Bearer ${token}` : '',
  }
}

function handleError(error: unknown): never {
  // TODO: show notification
  throw error
}

type Action<T, V> = (input: T, headers: HeadersInit | undefined) => Promise<V>

interface QueryOptions<V> {
  onSuccess?(value: V): void
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
