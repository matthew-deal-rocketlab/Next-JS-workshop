import { ERROR_INVALID_CREDENTIALS, ERROR_INVALID_INPUT, ERROR_NO_DB, RESULT_OK } from '../constants'
import { getUserBy, getUserDetailByUid, isFieldsValid, updateTable } from '../utils/db'

export const userRead = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS

  const userPromise = getUserBy(rc.db, 'uid', useruid)
  const userDetailPromise = getUserDetailByUid(rc.db, useruid)

  const allUserResult = await Promise.all([userPromise, userDetailPromise])
  const result = Object.assign({}, allUserResult[0], allUserResult[1])
  return { result }
}

export const userUpdate = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS

  const allowedUserFields = ['firstname', 'lastname', 'email']
  const allowedUserDetailFields = ['address', 'city', 'state', 'postcode', 'country']

  if (!isFieldsValid(input, allowedUserFields.concat(allowedUserDetailFields))) return ERROR_INVALID_INPUT

  const userResult = await updateTable(input, rc, 'tbl_user', allowedUserFields, `uid='${useruid}'`)
  if (userResult.error) return { error: userResult.error }

  const userDetailResult = await updateTable(input, rc, 'tbl_user_detail', allowedUserDetailFields, `uid='${useruid}'`)
  if (userDetailResult.error) return { error: userDetailResult.error }

  return RESULT_OK
}
