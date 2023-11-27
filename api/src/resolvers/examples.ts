import { ERROR_INVALID_CREDENTIALS, ERROR_NO_DB } from "../constants";
import { dbConnect, dbQuery } from "../services/db";
import { formatCurrency } from "../utils/misc";

export const fetchCardData = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB;
  const useruid = rc.useruid;
  if (!useruid) return ERROR_INVALID_CREDENTIALS;
  const sql = await dbConnect();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql.query(`SELECT COUNT(*) FROM invoices`);
    const customerCountPromise = sql.query(`SELECT COUNT(*) FROM customers`);
    const invoiceStatusPromise = sql.query(`SELECT
           SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
           SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
           FROM invoices`);

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      result: {
        numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices,
        totalPendingInvoices,
      }
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to card data.');
  }
}

export const fetchRevenue = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB;
  const useruid = rc.useruid;
  if (!useruid) return ERROR_INVALID_CREDENTIALS;

  const queryText = 'SELECT * FROM revenue'
  let result = null;
  result = await dbQuery(rc.db, queryText);

  if (result.error) return { error: result.error }
  if (!result || result.rowCount == 0) return { error: 'no result' };

  const revenue = result.rows;

  return { result: revenue } as Revenue;
}

export const fetchLatestInvoices = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB;
  const useruid = rc.useruid;
  if (!useruid) return ERROR_INVALID_CREDENTIALS;

  const queryText = `
        SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        ORDER BY invoices.date DESC
        LIMIT 5
      `
  let result = null;
  result = await dbQuery(rc.db, queryText);

  if (result.error) return { error: result.error }
  if (!result || result.rowCount == 0) return { error: 'no result' };

  const latestInvoices: LatestInvoice[] = result.rows.map(invoice => ({
    ...invoice,
    amount: formatCurrency(invoice.amount),
  }))

  return { result: latestInvoices }
}

export const fetchInvoicesPages = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB;
  const useruid = rc.useruid;
  if (!useruid) return ERROR_INVALID_CREDENTIALS;

  const queryText = `
      SELECT COUNT(*)
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE $1 OR
        customers.email ILIKE $1 OR
        invoices.amount::text ILIKE $1 OR
        invoices.date::text ILIKE $1 OR
        invoices.status ILIKE $1
    `
    
  let result = null;
  result = await dbQuery(rc.db, queryText, [`%${input}%`]);

  if (result.error) return { error: result.error }
  if (!result || result.rowCount == 0) return { error: 'no result' };

  const ITEMS_PER_PAGE = 6
  const totalPages = Math.ceil(Number(result.rows[0].count) / ITEMS_PER_PAGE)

  return { result: totalPages }
}

