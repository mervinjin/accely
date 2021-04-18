import { AuthChecker } from 'type-graphql'

export const authChecker: AuthChecker<ContextType> = ({ context }) => {
  return !!context.user
}
