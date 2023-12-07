// refreshTokenHelper.ts
import { ApiStatus, jsonPost } from '@/services/apiclient'
import { API_BASE_URL, API_STATIC_KEY, KEY_JWT_TOKEN, KEY_REFRESH_TOKEN } from '@/constants'

type AuthRefreshResult = {
  authRefresh?: {
    token?: string
    refreshToken?: string
  }
}

export async function refreshTokenHelper() {
  const currentRefreshToken = localStorage.getItem(KEY_REFRESH_TOKEN)
  if (!currentRefreshToken) return

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': API_STATIC_KEY,
  }

  const payload = { authRefresh: { refreshToken: currentRefreshToken } }
  const apiResponse = await jsonPost(`${API_BASE_URL}/jsonql`, {
    headers,
    body: JSON.stringify(payload),
  })

  if (apiResponse.status !== ApiStatus.OK || apiResponse.result === null) return

  const result = apiResponse.result as AuthRefreshResult
  const authRefreshResult = result.authRefresh
  if (typeof authRefreshResult === 'object' && authRefreshResult.token) {
    localStorage.setItem(KEY_JWT_TOKEN, authRefreshResult.token)
    if (authRefreshResult.refreshToken !== currentRefreshToken) {
      localStorage.setItem(KEY_REFRESH_TOKEN, authRefreshResult.refreshToken as string)
    }
  }
}
