import { dbConnect, dbQuery, dbClose } from '../services/db';
import { sendEmail } from '../services/email';

const sysCheck = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  // Check database connectivity`
  const db = await dbConnect();
  const query1 = await dbQuery(db, 'SELECT NOW(), current_database(), version();');
  const query2 = await dbQuery(db, 'SELECT * FROM pg_extension;');
  const query3 = await dbQuery(db, 'SELECT * FROM pg_available_extensions;');
  dbClose(db);

  // Check email sendability
  const sendResult = await sendEmail(
    'jason.soo@rocketlab.com.au',
    'It`s alive!',
    'If you can read this from gmail, then it works',
  );

  return {
    result: {
      database: query1.rows[0],
      extensions_installed: query2.rows[0],
      extensions_available: query3.rows[0],
      email: sendResult,
    },
  };
};

export { sysCheck };
