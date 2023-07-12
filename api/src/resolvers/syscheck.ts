import { dbConnect, dbQuery, dbClose } from "../services/db";

const sysCheck = async (input: Object, rc: ResolverContext) => {
  const db = await dbConnect();
  const result = await dbQuery(db, "SELECT NOW(), current_database(), version()");
  dbClose(db);

  return { result: result.rows[0] };
};

export { sysCheck };
