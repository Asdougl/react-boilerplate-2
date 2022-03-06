import axios, { AxiosResponse } from 'axios'
import { Agents, FetchError, Reply } from './core'

export const handleAxiosRequest = async <T>(
  request: Promise<AxiosResponse<T>>
): Promise<Reply<T>> => {
  try {
    const { data, status } = await request

    return {
      ok: true,
      data,
      status,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error)
      return {
        ok: false,
        message: error.response
          ? error.response.data.message ||
            error.response.statusText ||
            error.message
          : error.message,
      }
    } else if (error instanceof Error) {
      console.error(error)
      return {
        ok: false,
        message: error.message,
      }
    } else {
      console.error(error)
      return {
        ok: false,
        message: 'An unknown error has occurred',
      }
    }
  }
}

export const handleFetchRequest = async <T>(
  request: ReturnType<typeof fetch>
): Promise<Reply<T>> => {
  try {
    const response = await request

    try {
      const body = await response.json()

      if (!response.ok) {
        throw new Error(body.message || response.statusText)
      }

      return {
        ok: true,
        data: body,
        status: response.status,
      }
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        return {
          ok: false,
          message: error.message,
          status: response.status,
        }
      } else {
        return {
          ok: false,
          message: 'An unkown error has occurred',
        }
      }
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
      }
    } else {
      return {
        ok: false,
        message: 'An unkown error has occurred',
      }
    }
  }
}

interface HandleRequestOptionsBase {
  agent: Agents
}

interface HandleRequestOptionsAxios<T> extends HandleRequestOptionsBase {
  agent: 'axios'
  request: Promise<AxiosResponse<T>>
}

interface HandleRequestOptionsFetch extends HandleRequestOptionsBase {
  agent: 'fetch'
  request: ReturnType<typeof fetch>
}

type HandleRequestOptions<T> =
  | HandleRequestOptionsAxios<T>
  | HandleRequestOptionsFetch

export const handleRequest = <T>(
  options: HandleRequestOptions<T>
): Promise<Reply<T>> => {
  if (options.agent === 'axios') {
    return handleAxiosRequest(options.request)
  } else if (options.agent === 'fetch') {
    return handleFetchRequest(options.request)
  } else {
    throw new TypeError(
      "Typeof options.agent must be either 'axios' or 'fetch'"
    )
  }
}
