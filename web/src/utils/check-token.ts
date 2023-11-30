import { type DecodedTokenProps } from '@/types'
import jwtDecoder from './jwt-decoder'
import dateToSeconds from './date-to-seconds'

export const checkTokenStillValid = (accessToken: string | null) => {
  const decodedToken = accessToken
    ? (jwtDecoder(accessToken) as DecodedTokenProps)
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
