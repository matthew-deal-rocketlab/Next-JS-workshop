// Underlying library to retrieve remote data


export type ApiResponse = {
  status: ApiStatus
  result: JsonQLOutput | string | number | boolean | object
}

export enum ApiStatus {
  OK,
  ERROR,
  NO_AUTH,
  TIMEOUT,
  NO_NETWORK,
  UNKNOWN,
}


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

const jsonFetch = async (
  url: string,
  options: RequestInit,
): Promise<ApiResponse> => {
  const fetchOptions = { ...defaultFetchOptions, ...options }

  console.log(`${new Date()} ${options.method}: ${url}`)
  console.log(fetchOptions)

  try {
    const response = await fetch(url, { ...fetchOptions })

    // console.log(`${new Date()} >>> response`, response)

    if (response.status === 200) {
      const json = await response.json()
      return { status: ApiStatus.OK, result: json }
    }

    if (response.status === 403) {
      return { status: ApiStatus.NO_AUTH, result: { url, options } }
    }

    return { status: ApiStatus.UNKNOWN, result: response }
  } catch (error) {
    console.log('>>> error:', error)
    return { status: ApiStatus.UNKNOWN, result: `unknown error: ${error}` }
  }

  // console.log(`${new Date()} >>> done`)
}

export const jsonPost = async (
  url: string,
  options?: object,
): Promise<ApiResponse> => {
  return jsonFetch(url, { ...options, method: 'POST' })
}

export const jsonGet = async (
  url: string,
  options?: object,
): Promise<ApiResponse> => {
  return jsonFetch(url, { ...options, method: 'GET' })
}
