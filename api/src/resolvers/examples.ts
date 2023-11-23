import { dbConnect } from "../services/db";
import { formatCurrency } from "../utils/misc";

export const fetchCardData = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
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

    console.log('hello', numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,)

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