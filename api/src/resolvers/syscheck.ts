import { dbConnect, dbQuery, dbClose } from '../services/db';
import { sendEmail } from '../services/email';

const sysCheck = async (input: JsonQLInput, rc: ResolverContext) => {
  // Check database connectivity`
  const db = await dbConnect();
  const queryResult = await dbQuery(
    db,
    'SELECT NOW(), current_database(), version()',
  );
  dbClose(db);

  // Check email sendability
  const sendResult = await sendEmail(
    'jason.soo@rocketlab.com.au',
    'It`s alive!',
    'If you can read this from gmail, then it works',
  );

  return {
    result: {
      database: queryResult.rows[0],
      email: sendResult,
    },
  };
};

export { sysCheck };
