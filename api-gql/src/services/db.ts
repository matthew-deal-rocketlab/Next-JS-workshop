// Database connectivity service

import { Client, ClientConfig, QueryResult } from 'pg'
import { IS_DEBUG } from '../constants'

interface DBResult extends QueryResult {
  error?: string
}

export type DBConnection = Client

export const dbConnect = async (): Promise<DBConnection> => {
  const dbOptions: ClientConfig = {
    // postgres://user:password@host:5432/database
    // connectionString: '',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '') || 5432,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  }
  const client = new Client(dbOptions)
  await client.connect()
  return client
}

export const dbQuery = async (
  db: DBConnection,
  sql: string,
  values?: unknown[],
  // values?: (string | number | boolean | (string | number | boolean)[] | JsonQLInput | undefined)[],
): Promise<DBResult> => {
  if (IS_DEBUG) console.log(sql)
  try {
    if (values) {
      if (IS_DEBUG) console.log(values)
      return await db.query(sql, values)
    } else {
      return await db.query(sql)
    }
  } catch (error) {
    return <DBResult>{ error: `${error}`, rowCount: 0, rows: [], command: '', oid: 0, fields: [] }
  }
}

export const dbClose = async (db: DBConnection | null): Promise<void> => {
  if (db) await db.end()
}
