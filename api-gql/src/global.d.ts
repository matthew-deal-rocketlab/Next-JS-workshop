export declare global {
  type JsonQLInput = {
    [key: string]: string | number | boolean | Array<string | number | boolean> | JsonQLInput
  }

  type JsonQLOutput = {
    error?: string
    result?: string | number | boolean | object | JsonQLInput | JsonQLInput[]
  }

  interface ResolverContext {
    userid: number
    useruid: string
    db: DBConnection | null
  }

  interface StringMap {
    [key: string]: string | number
  }

  interface StringStringMap {
    [key: string]: string | StringMap
  }

  // Generic type that returns a string/string map for an error or a string as a result
  interface FnResult {
    error?: string
    result?: string | StringMap
  }

  // interface for returning simple success values
  interface OkString {
    value: string
  }
  interface OkNumber {
    value: number
  }

  // Site items
  interface ISiteItem {
    url: string
    timeout: number
  }
}
