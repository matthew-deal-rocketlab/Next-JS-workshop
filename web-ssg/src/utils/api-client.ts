'use client'

import { API_BASE_URL, API_STATIC_KEY, KEY_JWT_TOKEN } from '@/constants'
import { jsonPost, type ApiResponse } from '@/services/apiclient'
import { refreshTokenHelper } from './refreshToken'

/*
 * This is a wrapper around the jsonPost function from the apiclient.
 * It adds a few things:
 * - It adds the JWT token to the headers
 * - It checks if the JWT token is still valid, and if not, it refreshes the token
 * - It retries the request if the JWT token was refreshed
 */

export const apiPost = async (url: string, data: object): Promise<ApiResponse> => {
  const jwtToken = localStorage.getItem(KEY_JWT_TOKEN)
  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    'x-api-key': API_STATIC_KEY,
    Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
  }

  const apiResponse = await jsonPost(`${API_BASE_URL}${url}`, {
    headers,
    body: JSON.stringify(data),
  })

  // This is an additional status check, even know we are checking this in the AuthProvider.
  // This checks when we call an API endpoint directly, without using the AuthProvider.
  if (apiResponse.status === 419) {
    const refreshed = await refreshTokenHelper()
    if (refreshed) {
      return await apiPost(url, data)
    }
  }

  // Handle other responses
  return apiResponse
}
