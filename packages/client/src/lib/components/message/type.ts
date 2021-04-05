export interface MessageProps {
  id: string
  duration?: number
  content: string
  type: 'info' | 'success' | 'warning' | 'error'
}
