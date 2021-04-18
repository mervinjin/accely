import bcrypt from 'bcrypt'

export const crypt = {
  hash(data: string) {
    return bcrypt.hash(data, 10)
  },
  compare(data: string, encrypted: string) {
    return bcrypt.compare(data, encrypted)
  },
}
