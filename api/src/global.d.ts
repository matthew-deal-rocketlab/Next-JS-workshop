import { Client } from 'pg';

export {};

declare global {
  type DBConnection = Client;

  type JsonQLInput = {
    [key: string]:
      | string
      | number
      | boolean
      | Array<string | number | boolean>
      | JsonQLInput;
  };

  type JsonQLOutput = JsonQLInput;

  interface ResolverContext {
    userid: string;
    db: DBConnection | null;
  }

  // interface for returning simple success values
  interface OkString {
    value: string
  }
  interface OkNumber {
    value: number
  }
}
