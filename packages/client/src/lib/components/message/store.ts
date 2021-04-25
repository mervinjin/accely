import { writable } from 'svelte/store'
import type { MessageProps } from './type'

export const messages = writable<MessageProps[]>([])

export function createMessage(props: MessageProps) {
  messages.update(messages => [...messages, props])
}

export function removeMessage(id: string) {
  messages.update(messages => messages.filter(message => message.id !== id))
}
