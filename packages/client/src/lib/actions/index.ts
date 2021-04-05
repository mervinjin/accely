import { accessToken } from '$lib/stores'
import { clientSdk, query } from './utils'

export const signIn = query(clientSdk.signIn, {
  onSuccess(value) {
    accessToken.set(value?.signIn?.accessToken)
  },
})

export const signUp = query(clientSdk.signUp, {
  onSuccess(value) {
    accessToken.set(value?.signUp?.accessToken)
  },
})
