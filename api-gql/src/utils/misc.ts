import { webcrypto } from 'crypto'

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export const uuidv4 = (includeDashes: boolean = true) => {
  const randomarray = webcrypto.getRandomValues(new Uint8Array(36))
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, i) => {
    const r = (randomarray[i] ?? 0) & 0xf
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })

  return includeDashes ? uuid : uuid.replaceAll('-', '')
}

export const JSON_stringify = (
  input: unknown,
  replacer?: ((this: unknown, key: string, value: unknown) => unknown) | undefined,
  space?: string | number | undefined,
): string | null => {
  try {
    return JSON.stringify(input, replacer, space)
  } catch (_) {
    return null
  }
}

export const JSON_parse = (input: string): null | unknown => {
  try {
    return JSON.parse(input)
  } catch (_) {
    return null
  }
}
