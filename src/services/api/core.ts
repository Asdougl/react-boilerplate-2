/*

core.ts -- files that you will rarely need to edit

*/

export interface QueryParams {
  [param: string]: string
}

export const createResourcePath = (domain: string, path: string[]): string => {
  return `${domain}/${path.join('/')}`
}

export const addResourceId = (path: string, id: string) => {
  return `${path}/${id}`
}

export const addQueryParams = (path: string, queryParams: QueryParams) => {
  let params: string[] = []
  for (const param in queryParams) {
    params = [...params, `${encodeURI(param)}=${encodeURI(queryParams[param])}`]
  }
  return params.length ? `${path}?${params.join('&')}` : path
}

interface BaseReply {
  readonly ok: boolean
}

export interface OkReply<T> extends BaseReply {
  readonly ok: true
  readonly data: T
  readonly status: number
}

export interface ErrReply extends BaseReply {
  readonly ok: false
  readonly message: string
  readonly status?: number
}

export type Reply<T> = OkReply<T> | ErrReply

export const replyIsOk = <T>(reply: Reply<T>): reply is OkReply<T> => {
  return reply.ok
}

export type ReplyPromise<T> = Promise<Reply<T>>

export type Agents = 'axios' | 'fetch'

export interface Headers {
  [header: string]: string
}

export type HeaderGetter = () => Headers

interface ContainsHeaders {
  headers?: Headers
}

export const buildHeaders = (
  options: ContainsHeaders | undefined,
  getHeaders?: (() => Headers) | undefined
): Headers | undefined => {
  let headers: Headers = getHeaders ? getHeaders() : {}

  if (options && options.headers) {
    headers = { ...headers, ...options.headers }
  }

  return Object.keys(headers).length > 0 ? headers : undefined
}

export interface FetchError extends Error {
  code?: number
}
