// Underlying library to retrieve remote data

import { type JsonQLInput } from '@/types'

export interface ApiResponse {
  status: ApiStatus
  result: JsonQLInput | string | object
}

export const ApiStatus = {
  OK: 200,
  ERROR: 400,
  EXPIRED: 419,
  UPGRADE: 426, // Use to prompt user to upgrade client
  TIMEOUT: -1,
  NO_NETWORK: -2,
  UNKNOWN: -3,
} as const

type ApiStatus = typeof ApiStatus[keyof typeof ApiStatus]

const defaultFetchOptions = {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  // mode: 'cors', // no-cors, *cors, same-origin
  // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  // credentials: 'same-origin', // include, *same-origin, omit
  // headers: {
  //   Accept: 'application/json',
  //   'Content-type': 'application/json',
  //   // 'Content-Type': 'application/x-www-form-urlencoded',
  // },
  // redirect: 'follow', // manual, *follow, error
  // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  timeout: 9 * 1000, // 9 second timeout
}

const jsonFetch = async (url: string, options: RequestInit): Promise<ApiResponse> => {
  const fetchOptions = { ...defaultFetchOptions, ...options }

  console.log(`${new Date()} ${options.method}: ${url}`)
  console.log(fetchOptions)

  let response: Response
  try {
    response = await fetch(url, { ...fetchOptions })
  } catch (error) {
    console.log('>>> error:', error)
    return { status: ApiStatus.UNKNOWN, result: `unknown error: ${error}` }
  }
  // console.log(`${new Date()} >>> response`, response)

  if (response.status === ApiStatus.OK) {
    const json = await response.json()
    return { status: ApiStatus.OK, result: json }
  }

  if (response.status === ApiStatus.EXPIRED) {
    return { status: ApiStatus.EXPIRED, result: { url, options } }
  }

  return { status: ApiStatus.UNKNOWN, result: response }
}

export const jsonPost = async (url: string, options?: object): Promise<ApiResponse> => {
  return await jsonFetch(url, { ...options, method: 'POST' })
}

export const jsonGet = async (url: string, options?: object): Promise<ApiResponse> => {
  return await jsonFetch(url, { ...options, method: 'GET' })
}
