import { type DecodedTokenProps } from '@/types'
import jwtDecoder from './jwt-decoder'
import dateToSeconds from './date-to-seconds'

export const checkTokenStillValid = (accessToken: string) => {
  const decodedToken = jwtDecoder(accessToken) as DecodedTokenProps
  const date = new Date()

  if (decodedToken?.payload?.exp > dateToSeconds(date)) {
    console.log('Decoded token:', decodedToken, dateToSeconds(date))
    return true
  }
  return false
}
