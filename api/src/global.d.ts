import { Client } from 'pg';

declare global {
  type JsonQLInput = {
    [key: string]:
    | string
    | number
    | boolean
    | Array<string | number | boolean>
    | JsonQLInput;
  };

  type JsonQLOutput = {
    error?: string;
    result?: string | number | boolean | object | JsonQLInput | JsonQLInput[];
  };

  interface ResolverContext {
    useruid: string;
    db: DBConnection | null;
  }

  // Generic type that returns a string for an error or a string as a result
  interface FnResult {
    error?: string;
    result?: string;
  }

  // interface for returning simple success values
  interface OkString {
    value: string;
  }
  interface OkNumber {
    value: number;
  }

  // Site items
  interface ISiteItem {
    url: string;
    timeout: number;
  }
}
