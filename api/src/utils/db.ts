import { ERROR_DB_UPDATE, ERROR_INVALID_INPUT, RESULT_OK } from "../constants";
import { dbQuery } from "../services/db";

// returns an object with either .result or .error
export const updateTable = async (input: JsonQLInput, rc: ResolverContext,
    tableName: string, allowedFields: string[],
    condition: string
): Promise<FnResult> => {
    const fields = Object.keys(input)

    // limit number of fields that can be updated
    if (fields.length === 0 || fields.length > 20) return ERROR_INVALID_INPUT;

    const parameters = []
    const setFieldValue = []
    for (var i = 0; i < fields.length; i++) {
        const field = fields[i] ?? ''
        if (allowedFields.indexOf(field) < 0) return ERROR_INVALID_INPUT;
        setFieldValue.push(`${field} = $${i + 1}`)
        parameters.push(input[field])
    }

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

