import { accessToken } from '$lib/stores'
import { clientSdk, query } from './utils'

export const auth = query(clientSdk.auth, {
  onSuccess: value => {
    accessToken.set(value?.auth?.accessToken)
  },
})
