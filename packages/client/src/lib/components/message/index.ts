import { nanoid } from 'nanoid'
import { createMessage } from './store'
import type { MessageProps } from './type'
export { default as Message } from './message.svelte'
export { default as MessageBox } from './messageBox.svelte'

type ShorthandProps = Omit<MessageProps, 'type' | 'content' | 'id'>

function shorthandCreate(
  content: string,
  type: MessageProps['type'],
  options?: ShorthandProps
) {
  createMessage({ content, type, id: nanoid(), ...options })
}

export const message = {
  success(content: string, options?: ShorthandProps) {
    shorthandCreate(content, 'success', options)
  },
  info(content: string, options?: ShorthandProps) {
    shorthandCreate(content, 'info', options)
  },
  warning(content: string, options?: ShorthandProps) {
    shorthandCreate(content, 'warning', options)
  },
  error(content: string, options?: ShorthandProps) {
    shorthandCreate(content, 'error', options)
  },
}
