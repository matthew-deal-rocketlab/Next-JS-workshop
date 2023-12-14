import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookieStoreGet } from './services/cookie-store'
import { API_BASE_URL, API_STATIC_KEY, KEY_JWT_TOKEN, KEY_REFRESH_TOKEN } from './constants'
import { ApiStatus, jsonPost } from './services/apiclient'
import { checkTokenStillValid } from './utils/check-token'

export const config = {
  matcher: ['/example/:path*', '/dashboard/:path*'],
}

export async function middleware(request: NextRequest) {
  // get current refresh token
  const currentRefreshToken = await cookieStoreGet(KEY_REFRESH_TOKEN)
  const currentToken = await cookieStoreGet(KEY_JWT_TOKEN)
  // Redirect if not signed in
  if (!currentRefreshToken || !currentToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  // check if token is still valid
  const isRefreshTokenValid = checkTokenStillValid(currentRefreshToken)
  const isTokenValid = checkTokenStillValid(currentToken)

  console.log('isTokenValid', isTokenValid, isRefreshTokenValid)

  // if expired attempt to refresh
  if (!isTokenValid) {
    const { token, refreshToken } = await getRefreshToken()

    // Redirect if refresh fails
    if (token === '') return NextResponse.redirect(new URL('/auth/login', request.url))

    const response = NextResponse.next()

    // Set the cookie with the refresh token
    response.cookies.set(KEY_JWT_TOKEN, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    })

    response.cookies.set(KEY_REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    })

    const cookie = request.cookies.get('JWT_TOKEN')
    console.log('cookie', cookie)

    return response
  }
  return NextResponse.next()
}

const getRefreshToken = async (): Promise<{ token: string; refreshToken: string }> => {
  const currentRefreshToken = await cookieStoreGet(KEY_REFRESH_TOKEN)
  if (!currentRefreshToken) return { token: '', refreshToken: '' }

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

  if (apiResponse.status !== ApiStatus.OK || apiResponse.result === null)
    return { token: '', refreshToken: '' }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const authRefreshResult = apiResponse.result.authRefresh
  if (typeof authRefreshResult === 'object' && authRefreshResult.token) {
    return authRefreshResult
  }

  return { token: '', refreshToken: '' }
}
