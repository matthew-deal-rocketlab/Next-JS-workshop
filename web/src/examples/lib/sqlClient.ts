// db.ts
import { Client } from 'pg';

const getDbClient = async () => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD, // Make sure this is a string
    port: Number(process.env.DB_PORT), // Port should be a number
  });

  await client.connect();
  return client;
};

export default getDbClient;
