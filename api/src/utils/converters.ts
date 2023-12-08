// Base64 conversion
export const btoa = (str: string) => Buffer.from(str).toString('base64')
export const atob = (str: string) => Buffer.from(str, 'base64').toString()
