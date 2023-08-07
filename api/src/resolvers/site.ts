import { ERROR_INVALID_CREDENTIALS, ERROR_NO_DB } from "../constants";
import { dbQuery } from "../services/db";
import { getUserBy } from "../utils/db";
import { isUrl } from "../utils/validators";


export const siteListRead = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB;
  const useruid = rc.useruid;
  if (!useruid) return ERROR_INVALID_CREDENTIALS;

  const userInfo = await getUserBy(rc.db, 'uid', rc.useruid);
  if (typeof userInfo === 'string') return ERROR_INVALID_CREDENTIALS;

  const siteList = await dbQuery(rc.db, 'SELECT * FROM tbl_site WHERE user_id = $1', [userInfo['id']]);
  if (siteList.error) return { error: siteList.error }

  return { result: siteList.rows }
}


export const siteListUpdate = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB;
  const useruid = rc.useruid;
  if (!useruid) return ERROR_INVALID_CREDENTIALS;

  const siteList = input as unknown as ISiteItem[];

  const userInfo = await getUserBy(rc.db, 'uid', useruid);
  if (typeof userInfo === 'string') return ERROR_INVALID_CREDENTIALS;

  const userId = (userInfo['id'] ?? '') as string;
  if (!userId) return ERROR_INVALID_CREDENTIALS;

  const siteListDeleteResult = await dbQuery(rc.db, 'DELETE FROM tbl_site WHERE user_id = $1', [userInfo['id']]);
  if (siteListDeleteResult.error) return { error: siteListDeleteResult.error }

  if (siteList.length === 0) return { result: { rowsDelete: siteListDeleteResult.rowCount, rowsAdded: 0 } };

  let insertSitesQuery = 'INSERT INTO tbl_site (user_id, url, timeout) VALUES '
  let appendValues: unknown[] = [];
  let p = 0;
  for (const item of siteList) {
    insertSitesQuery += `${p === 0 ? '' : ','}(\$${++p}, \$${++p}, \$${++p})`;
    if (!isUrl(item.url)) return { error: `Invalid url: ${item.url}` };
    appendValues = appendValues.concat(userId, item.url, item.timeout);
  };

  const siteListInsertResult = await dbQuery(rc.db, `${insertSitesQuery};`, appendValues);
  if (siteListInsertResult.error) return { error: siteListInsertResult.error }

  return { result: { rowsDelete: siteListDeleteResult.rowCount, rowsAdded: siteListInsertResult.rowCount } };
}

export const siteSettingsRead = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB;
  const useruid = rc.useruid;
  if (!useruid) return ERROR_INVALID_CREDENTIALS;

  return { result: "todo" }
}

export const siteSettingsUpdate = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB;
  const useruid = rc.useruid;
  if (!useruid) return ERROR_INVALID_CREDENTIALS;

  return { result: "todo" }
}