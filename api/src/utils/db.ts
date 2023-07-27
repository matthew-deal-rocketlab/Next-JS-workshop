import { ERROR_DB_UPDATE, ERROR_INVALID_CREDENTIALS, ERROR_NO_DB, RESULT_OK } from "../constants";
import { dbQuery } from "../services/db";


export const isFieldsValid = (input: JsonQLInput, allowedFields: string[]): boolean => {
  const fields = Object.keys(input)

  // limit number of fields that can be updated
  if (fields.length === 0 || fields.length > 20) return false;

  for (var i = 0; i < fields.length; i++) {
    const field = fields[i] ?? ''
    if (allowedFields.indexOf(field) < 0) return false;
  }

  return true;
}

// returns an object with either .result or .error
// You should chek input with function isFieldsValid above
export const updateTable = async (input: JsonQLInput, rc: ResolverContext,
  tableName: string, allowedFields: string[],
  condition: string
): Promise<FnResult> => {
  const fields = Object.keys(input)

  const parameters = []
  const setFieldValue = []
  var count = 0;
  for (var i = 0; i < fields.length; i++) {
    const field = fields[i] ?? ''
    if (allowedFields.indexOf(field) >= 0) {
      count++;
      setFieldValue.push(`${field} = $${count}`)
      parameters.push(input[field])
    }
  }
  if (setFieldValue.length === 0) return RESULT_OK;

  const setFields = setFieldValue.join(',');
  const queryAddTable = `UPDATE ${tableName} SET ${setFields} WHERE ${condition}`

  let result = null;
  try {
    result = await dbQuery(rc.db!, queryAddTable, parameters);
    if (!result || result.rowCount !== 1) return ERROR_DB_UPDATE;
  } catch (err) {
    return { error: `ERROR: ${err}` };
  }

  return RESULT_OK;
}

export const getUserBy = async (
  db: DBConnection,
  field: string,
  value: string,
): Promise<JsonQLOutput | string> => {
  const queryUserBy = `SELECT * FROM tbl_user WHERE ${field} = $1`;
  let result = null;

  try {
    result = await dbQuery(db, queryUserBy, [value]);
    if (!result || result.rowCount == 0) return 'no result';
  } catch (err) {
    return `ERROR: ${err}`;
  }

  return result.rows[0];
};

export const getUserDetailById = async (
  db: DBConnection,
  uuid: string,
): Promise<JsonQLOutput | string> => {
  const queryUserDetailByUUID = 'SELECT * FROM tbl_user_detail WHERE id = $1';
  let result = null;

  try {
    result = await dbQuery(db, queryUserDetailByUUID, [uuid]);
    if (!result || result.rowCount == 0) return 'no result';
  } catch (err) {
    return `ERROR: ${err}`;
  }

  return result.rows[0];
};
