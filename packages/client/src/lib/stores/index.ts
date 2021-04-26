import { writable } from 'svelte/store'
import { getToken, setToken } from '$lib/utils/token'

export const accessToken = writable<string | null>(getToken())

accessToken.subscribe(token => {
  setToken(token)
})
