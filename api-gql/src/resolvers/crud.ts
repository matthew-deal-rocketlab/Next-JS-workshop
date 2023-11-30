// This is a generic resolver for CRUD operations on tables linked to users.
// All CRUD tables must have an incrementing id and must be linked to a user through a user_id
// The database schema must be defined in CRUD_TABLES in models/database.ts (this is a generated file)

import { ERROR_INVALID_CREDENTIALS, ERROR_INVALID_INPUT, ERROR_NO_DB } from '../constants'
import { CRUD_TABLES } from '../models/database.gen'
import { dbQuery } from '../services/db'

const MAX_ALLOWED_FIELDS = 50

const isTableValid = (tableName: string): boolean => {
  return Object.keys(CRUD_TABLES).indexOf(tableName) >= 0
}

const isFieldsValid = (tableName: string, fields: string[]): boolean => {
  const table = (CRUD_TABLES as StringStringMap)[tableName]
  if (!table) return false

  const tableFields = Object.keys(table as object)

  for (let i = 0; i < fields.length && i < MAX_ALLOWED_FIELDS; i++) {
    const field = fields[i] ?? ''
    if (tableFields.indexOf(field) < 0) return false
  }

  return true
}

export const crudCreate = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  const inputTable = (input['table'] ?? '') as string
  const inputFields = (input['fields'] ?? {}) as StringMap

  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS
  const userId = rc.userid
  if (userId <= 0) return ERROR_INVALID_CREDENTIALS

  const inputFieldNames = Object.keys(inputFields)
  if (inputFieldNames.length === 0) return ERROR_INVALID_INPUT
  if (!isTableValid(inputTable)) return ERROR_INVALID_INPUT
  if (!isFieldsValid(inputTable, inputFieldNames)) return ERROR_INVALID_INPUT

  // automatically add user id into input fields (must be last to prevent injection)
  const allFields = Object.assign(inputFields, { user_id: userId })
  const allFieldNames = Object.keys(allFields)

  // construct parameterized SQL statement and parameter values
  const paramList: string[] = []
  let paramValues: unknown[] = []
  let p = 0
  for (const fieldName in allFields) {
    paramList.push(`$${++p}`)
    paramValues = paramValues.concat(allFields[fieldName])
  }

  // execute insert query
  const insertQuery = `INSERT INTO ${inputTable} (${allFieldNames.join(', ')}) VALUES (${paramList.join(
    ', ',
  )}) RETURNING id;`
  const tableResult = await dbQuery(rc.db, insertQuery, paramValues)
  if (tableResult.error) return { error: tableResult.error }

  return { result: tableResult.rows[0] ?? { id: 0 } }
}

export const crudRead = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  const inputTable = (input['table'] ?? '') as string

  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS
  const userId = rc.userid
  if (userId <= 0) return ERROR_INVALID_CREDENTIALS

  if (!isTableValid(inputTable)) return ERROR_INVALID_INPUT

  const selectQuery = `SELECT * FROM ${inputTable} WHERE user_id = ${userId};`
  const tableResult = await dbQuery(rc.db, selectQuery)
  if (tableResult.error) return { error: tableResult.error }

  return { result: tableResult.rows ?? [] }
}

export const crudUpdate = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  const inputTable = (input['table'] ?? '') as string
  const inputRowId = (input['id'] ?? '') as string
  const inputFields = (input['fields'] ?? {}) as StringMap

  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS
  const userId = rc.userid
  if (userId <= 0) return ERROR_INVALID_CREDENTIALS

  const rowId = parseInt(inputRowId, 10)
  if (isNaN(rowId)) return ERROR_INVALID_INPUT

  const inputFieldNames = Object.keys(inputFields)
  if (inputFieldNames.length === 0) return ERROR_INVALID_INPUT
  if (!isTableValid(inputTable)) return ERROR_INVALID_INPUT
  if (!isFieldsValid(inputTable, inputFieldNames)) return ERROR_INVALID_INPUT

  // construct parameterized SQL statement and parameter values
  const paramList: string[] = []
  let paramValues: unknown[] = []
  let p = 0
  for (const fieldName in inputFields) {
    // client can update any field except the id and user_id of the row.  These will just be ignored
    if (['id', 'user_id'].indexOf(fieldName) < 0) {
      paramList.push(`${fieldName} = $${++p}`)
      paramValues = paramValues.concat(inputFields[fieldName])
    }
  }

  // execute update query
  const updateQuery = `UPDATE ${inputTable} SET ${paramList.join(
    ',',
  )} WHERE id = ${rowId} AND user_id = ${userId} RETURNING id;`
  const tableResult = await dbQuery(rc.db, updateQuery, paramValues)
  if (tableResult.error) return { error: tableResult.error }

  return { result: tableResult.rows[0] ?? { id: 0 } }
}

export const crudDelete = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  const inputTable = (input['table'] ?? '') as string
  const inputRowId = (input['id'] ?? '') as string

  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS
  const userId = rc.userid
  if (userId <= 0) return ERROR_INVALID_CREDENTIALS

  const rowId = parseInt(inputRowId, 10)
  if (isNaN(rowId)) return ERROR_INVALID_INPUT

  if (!isTableValid(inputTable)) return ERROR_INVALID_INPUT

  const insertQuery = `DELETE FROM ${inputTable} WHERE id = ${rowId} AND user_id = ${userId} RETURNING id;`
  const tableResult = await dbQuery(rc.db, insertQuery)
  if (tableResult.error) return { error: tableResult.error }

  return { result: tableResult.rows[0] ?? { id: 0 } }
}
