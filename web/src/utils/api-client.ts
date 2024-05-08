'use server'

import { API_BASE_URL, API_STATIC_KEY, KEY_JWT_TOKEN, KEY_REFRESH_TOKEN } from '@/constants'
import { jsonPost, type ApiResponse, ApiStatus } from '@/services/apiclient'
import { cookieStoreGet } from '@/services/cookie-store'
import { cache } from 'react'

export const apiPost = async (
  url: string,
  data: object,
  allowRefresh: boolean = true,
): Promise<ApiResponse> => {
  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    'x-api-key': API_STATIC_KEY,
    Authorization: '',
    cache: 'no-cache',
  }

  // if a refresh token exists we must be in a logged in state
  const currentRefreshToken = await cookieStoreGet(KEY_REFRESH_TOKEN)
  if (currentRefreshToken) {
    // TODO: to get somewhere else
    const jwtToken = await cookieStoreGet(KEY_JWT_TOKEN)
    headers.Authorization = `Bearer ${jwtToken}`
  }

  const apiResponse = await jsonPost(`${API_BASE_URL}${url}`, {
    headers,
    body: JSON.stringify(data),
  })

  if (apiResponse.status === ApiStatus.OK) return apiResponse

  // For erros, maybe just flash a message on the screen
  if (apiResponse.status === ApiStatus.NO_NETWORK) {
    return { status: apiResponse.status, result: 'No network connectivity' }
  }

  // all other situations, show generic message
  return { status: apiResponse.status, result: 'Could not connect to server' }
}
