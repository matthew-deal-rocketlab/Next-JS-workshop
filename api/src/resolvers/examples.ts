import { ERROR_INVALID_CREDENTIALS, ERROR_NO_DB } from '../constants'
import { dbQuery } from '../services/db'
import { formatCurrency } from '../utils/misc'

export const fetchCardData = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS

  try {
    const invoiceCountPromise = dbQuery(rc.db, `SELECT COUNT(*) FROM invoices`)
    const customerCountPromise = dbQuery(rc.db, `SELECT COUNT(*) FROM customers`)
    const invoiceStatusPromise = dbQuery(
      rc.db,
      `SELECT
           SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
           SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
           FROM invoices`,
    )

    const results = await Promise.allSettled([invoiceCountPromise, customerCountPromise, invoiceStatusPromise])

    // Processing results
    const numberOfInvoices = results[0].status === 'fulfilled' ? Number(results[0].value.rows[0].count ?? '0') : 'Error'
    const numberOfCustomers =
      results[1].status === 'fulfilled' ? Number(results[1].value.rows[0].count ?? '0') : 'Error'
    const totalPaidInvoices =
      results[2].status === 'fulfilled' ? formatCurrency(results[2].value.rows[0].paid ?? '0') : 'Error'
    const totalPendingInvoices =
      results[2].status === 'fulfilled' ? formatCurrency(results[2].value.rows[0].pending ?? '0') : 'Error'

    return {
      result: {
        numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices,
        totalPendingInvoices,
      },
    }
  } catch (error) {
    console.error('Database Error:', error)
    return { error: 'database error' }
  }
}

export const fetchRevenue = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS

  const queryText = 'SELECT * FROM revenue'
  let result = null
  result = await dbQuery(rc.db, queryText)

  if (result.error) return { error: result.error }
  if (!result || result.rowCount == 0) return { error: 'no result' }

  const revenue = result.rows

  return { result: revenue } as Revenue
}

export const fetchLatestInvoices = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS

  const queryText = `
        SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        ORDER BY invoices.date DESC
        LIMIT 5
      `
  let result = null
  result = await dbQuery(rc.db, queryText)

  if (result.error) return { error: result.error }
  if (!result || result.rowCount == 0) return { error: 'no result' }

  const latestInvoices: LatestInvoice[] = result.rows.map(invoice => ({
    ...invoice,
    amount: formatCurrency(invoice.amount),
  }))

  return { result: latestInvoices }
}

export const fetchInvoicesPages = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS

  const queryText = `
      SELECT COUNT(*)
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE CONCAT('%', $1::text, '%') OR
        customers.email ILIKE CONCAT('%', $1::text, '%') OR
        invoices.amount::text ILIKE CONCAT('%', $1::text, '%') OR
        invoices.date::text ILIKE CONCAT('%', $1::text, '%') OR
        invoices.status ILIKE CONCAT('%', $1::text, '%')
    `

  let result = null
  result = await dbQuery(rc.db, queryText, [input.query])

  if (result.error) return { error: result.error }
  if (!result || result.rowCount == 0) return { error: 'no result' }

  const ITEMS_PER_PAGE = 6
  const totalPages = Math.ceil(Number(result.rows[0].count) / ITEMS_PER_PAGE)

  return { result: totalPages }
}

export const fetchFilteredInvoices = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS

  const ITEMS_PER_PAGE = 6
  const offset = ((input.page as number) - 1) * ITEMS_PER_PAGE

  // Updated query with explicit casting to text
  const queryText = `
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE CONCAT('%', $1::text, '%') OR
        customers.email ILIKE CONCAT('%', $1::text, '%') OR
        invoices.amount::text ILIKE CONCAT('%', $1::text, '%') OR
        invoices.date::text ILIKE CONCAT('%', $1::text, '%') OR
        invoices.status ILIKE CONCAT('%', $1::text, '%')
      ORDER BY invoices.date DESC
      LIMIT $2 OFFSET $3
    `

  let result = null
  result = await dbQuery(rc.db, queryText, [input.query, ITEMS_PER_PAGE, offset])

  if (result.error) return { error: result.error }
  if (!result || result.rowCount == 0) return { error: 'no result' }

  return { result: result.rows }
}

export const fetchInvoiceById = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS

  const queryText = `
    SELECT
      id,
      customer_id,
      amount,
      status
    FROM invoices
    WHERE id = $1;
  `

  let result = null
  result = await dbQuery(rc.db, queryText, [input.query])

  if (result.error) return { error: result.error }
  if (!result || result.rowCount == 0) return { error: 'no result' }

  const invoice = result.rows.map(invoice => ({
    ...invoice,
    amount: invoice.amount / 100,
  }))

  return { result: invoice[0] }
}

export const fetchCustomers = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS

  const queryText = `
    SELECT
      id,
      name
    FROM customers
    ORDER BY name ASC
  `

  let result = null
  result = await dbQuery(rc.db, queryText)

  if (result.error) return { error: result.error }
  if (!result || result.rowCount == 0) return { error: 'no result' }

  const customers: CustomerField[] = result.rows

  return { result: customers }
}

export const createInvoice = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS

  const queryText = `
    INSERT INTO invoices (id, customer_id, amount, status, date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
  `

  let result = null
  result = await dbQuery(rc.db, queryText, [input.invoiceId, input.customerId, input.amount, input.status, input.date])

  if (result.error) return { error: result.error }
  if (!result || result.rowCount == 0) return { error: 'no result' }

  return { result: result.rows[0] }
}

export const updateInvoice = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS

  const queryText = `
  UPDATE invoices
  SET customer_id = $1, amount = $2, status = $3
  WHERE id = $4
  RETURNING *
  `

  let result = null
  result = await dbQuery(rc.db, queryText, [input.customer_id, input.amount, input.status, input.id])

  console.log('updateInvoice', result)

  if (result.error) return { error: result.error }
  if (!result || result.rowCount == 0) return { error: 'no result' }

  return { result: result.rows[0] }
}

export const deleteInvoice = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB
  const useruid = rc.useruid
  if (!useruid) return ERROR_INVALID_CREDENTIALS

  const queryText = `DELETE FROM invoices WHERE id = $1`

  let result = null
  result = await dbQuery(rc.db, queryText, [input.id])

  if (result.error) return { error: result.error }
  if (!result || result.rowCount == 0) return { error: 'no result' }

  return { result: result.rows[0] }
}
