import { store } from '../redux/store'
import { User } from '../types/User'
import { createResourcePath } from './api/core'
import { createGetOne, createPost, createPut } from './api/request'

const examplePath = createResourcePath('http://localhost:5000', [
  'example',
  'user',
])

const getHeaders = () => {
  const userId = store.getState().example.user?.id
  return {
    Authorization: `Bearer ${userId}`,
  }
}

export const getUser = createGetOne<User>('axios', examplePath, getHeaders)

export const postUser = createPost<User>('axios', examplePath, getHeaders)

export const putUser = createPut<User>('axios', examplePath, getHeaders)
