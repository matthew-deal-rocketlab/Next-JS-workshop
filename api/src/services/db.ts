import { Client, QueryResult } from "pg";

type DBConnection = Client;

export const dbConnect = async (): Promise<DBConnection> => {
  const client = new Client({
    host: "my.database-server.com",
    port: 5334,
    database: "database-name",
    user: "database-user",
    password: "secretpassword!!",
  });
  await client.connect();
  return client;
};

export const dbQuery = async (
  db: DBConnection,
  sql: string,
  values: any[]
): Promise<QueryResult<any>> => {
  return await db.query(sql, values);
};

export const dbClose = async (db: DBConnection): Promise<void> => {
  await db.end();
};
