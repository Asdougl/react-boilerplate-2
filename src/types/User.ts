import dayjs from 'dayjs'

export interface User {
  id: string
  name: string
  age: number
  bio: string
}

export const exampleUser = (id?: string): User => ({
  id: id || 'abc123',
  name: 'asdougl',
  age: dayjs().get('year') - 1997,
  bio: 'Frontend Web Developer',
})

export type UserPayload = Pick<User, 'name' | 'bio' | 'age'>
