import { Buffer } from 'buffer'

interface DecodedToken {
  header: object
  payload: object
}

// Base64 conversion
// const btoa = (str: string) => Buffer.from(str).toString('base64');
const atob = (str: string) => Buffer.from(str, 'base64').toString()

const jwtDecoder = (token: string): DecodedToken | null => {
  const [headerEncoded, payloadEncoded, signature] = token.split('.')
  if (!headerEncoded || !payloadEncoded || !signature) {
    return null // Invalid JWT format
  }

  try {
    const header = JSON.parse(atob(headerEncoded))
    const payload = JSON.parse(atob(payloadEncoded))
    return {
      header,
      payload,
    }
  } catch (error) {
    console.error('Error decoding JWT:', (error as Error).message)
    return null
  }
}

export default jwtDecoder
