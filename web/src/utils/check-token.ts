import { type DecodedTokenProps } from '@/types'
import jwtDecoder from './jwt-decoder'
import dateToSeconds from './date-to-seconds'
import { cookieStoreGet } from '@/services/cookie-store'

export const checkTokenStillValid = (accessToken: string | null) => {
  const decodedToken: DecodedTokenProps = accessToken
    ? jwtDecoder(accessToken)
    : {
        header: null,
        payload: null,
      }
  const date = new Date()

  if (accessToken && decodedToken?.payload?.exp && decodedToken.payload.exp > dateToSeconds(date)) {
    console.log('Decoded token:', decodedToken, dateToSeconds(date))
    return true
  }
}

export const isTokenValid = async (type: string | undefined) => {
  if (!type) return
  const token = (await cookieStoreGet(type)) ?? null
  const isTokenValid = checkTokenStillValid(token)
  return isTokenValid
}
