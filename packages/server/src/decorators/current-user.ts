import { createParamDecorator } from 'type-graphql'

export function CurrentUser() {
  return createParamDecorator<ContextType>(({ context }) => context.user)
}
