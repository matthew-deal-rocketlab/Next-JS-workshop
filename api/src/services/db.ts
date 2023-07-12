import { Client, ClientConfig, QueryResult } from "pg";
const prnt = console.log;

type DBConnection = Client;

export const dbConnect = async (): Promise<DBConnection> => {
  prnt(">> dbConnect:");
  const dbOptions: ClientConfig = {
    // postgres://user:password@host:5432/database
    // connectionString: '',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "") || 5432,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  };
  prnt(dbOptions);
  const client = new Client(dbOptions);
  await client.connect();
  // prnt(client);
  return client;
};

export const dbQuery = async (
  db: DBConnection,
  sql: string,
  values?: any[]
): Promise<QueryResult<any>> => {
  if (values) {
    return await db.query(sql, values);
  } else {
    return await db.query(sql);
  }
};

export const dbClose = async (db: DBConnection): Promise<void> => {
  await db.end();
};
