import axios from 'axios'
import {
  addQueryParams,
  addResourceId,
  Agents,
  buildHeaders,
  HeaderGetter,
  Headers,
  QueryParams,
  ReplyPromise,
} from './core'
import { handleAxiosRequest, handleFetchRequest } from './response'

interface BaseOptions {
  headers?: Headers
}

export interface GetOptions<T> extends BaseOptions {
  query?: QueryParams
}

export type GetOne<T> = (id: string, options?: GetOptions<T>) => ReplyPromise<T>

export const createGetOne = <T>(
  agent: Agents,
  path: string,
  getHeaders?: HeaderGetter
): GetOne<T> => {
  if (agent === 'axios') {
    return (id, options) => {
      const withResourceId = addResourceId(path, id)
      const request = axios.get<T>(
        options?.query
          ? addQueryParams(withResourceId, options.query)
          : withResourceId,
        { headers: buildHeaders(options, getHeaders) }
      )
      return handleAxiosRequest(request)
    }
  } else {
    return (id, options) => {
      const withResourceId = addResourceId(path, id)
      const request = fetch(
        options?.query
          ? addQueryParams(withResourceId, options.query)
          : withResourceId,
        { method: 'GET', headers: buildHeaders(options, getHeaders) }
      )
      return handleFetchRequest<T>(request)
    }
  }
}

export type GetAll<T> = (options?: GetOptions<T>) => ReplyPromise<T>

export const createGetAll = <T>(
  agent: Agents,
  path: string,
  getHeaders?: HeaderGetter
): GetAll<T> => {
  if (agent === 'axios') {
    return (options) => {
      const request = axios.get<T>(
        options && options.query ? addQueryParams(path, options.query) : path,
        { headers: buildHeaders(options, getHeaders) }
      )
      return handleAxiosRequest(request)
    }
  } else {
    return (options) => {
      const request = fetch(
        options?.query ? addQueryParams(path, options.query) : path,
        {
          method: 'GET',
          headers: buildHeaders(options, getHeaders),
        }
      )
      return handleFetchRequest<T>(request)
    }
  }
}

export type Post<T, U> = (payload: U, options?: BaseOptions) => ReplyPromise<T>

export const createPost = <T, U = T>(
  agent: Agents,
  path: string,
  getHeaders?: HeaderGetter
): Post<T, U> => {
  if (agent === 'axios') {
    return (payload, options) => {
      const request = axios.post<T>(path, payload, {
        headers: buildHeaders(options, getHeaders),
      })
      return handleAxiosRequest(request)
    }
  } else {
    return (payload, options) => {
      const request = fetch(path, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: buildHeaders(options, getHeaders),
      })
      return handleFetchRequest<T>(request)
    }
  }
}

export type Put<T> = (
  id: string,
  payload: T,
  options?: BaseOptions
) => ReplyPromise<T>

export const createPut = <T>(
  agent: Agents,
  path: string,
  getHeaders?: HeaderGetter
): Put<T> => {
  if (agent === 'axios') {
    return (id, payload, options) => {
      const request = axios.put<T>(addResourceId(path, id), payload, {
        headers: buildHeaders(options, getHeaders),
      })
      return handleAxiosRequest(request)
    }
  } else {
    return (id, payload, options) => {
      const request = fetch(addResourceId(path, id), {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: buildHeaders(options, getHeaders),
      })
      return handleFetchRequest<T>(request)
    }
  }
}

export type Patch<T> = (
  id: string,
  payload: Partial<T>,
  options?: BaseOptions
) => ReplyPromise<T>

export const createPatch = <T>(
  agent: Agents,
  path: string,
  getHeaders?: HeaderGetter
): Patch<T> => {
  if (agent === 'axios') {
    return (id, payload, options) => {
      const request = axios.patch<T>(addResourceId(path, id), payload, {
        headers: buildHeaders(options, getHeaders),
      })
      return handleAxiosRequest(request)
    }
  } else {
    return (id, payload, options) => {
      const request = fetch(addResourceId(path, id), {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: buildHeaders(options, getHeaders),
      })
      return handleFetchRequest<T>(request)
    }
  }
}

export type Remove<T> = (id: string, options?: BaseOptions) => ReplyPromise<T>

export const createRemove = <T>(
  agent: Agents,
  path: string,
  getHeaders?: HeaderGetter
): Remove<T> => {
  if (agent === 'axios') {
    return (id, options) => {
      const request = axios.delete<T>(addResourceId(path, id), {
        headers: buildHeaders(options, getHeaders),
      })
      return handleAxiosRequest(request)
    }
  } else {
    return (id, options) => {
      const request = fetch(addResourceId(path, id), {
        method: 'DELETE',
        headers: buildHeaders(options, getHeaders),
      })
      return handleFetchRequest<T>(request)
    }
  }
}
