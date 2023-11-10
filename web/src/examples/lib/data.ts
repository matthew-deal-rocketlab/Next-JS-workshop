import { formatCurrency } from '@/examples/utils/helpers';
import { unstable_noStore as noStore } from 'next/cache';
import getDbClient from './sqlClient';
import {
  LatestInvoice,
  LatestInvoiceRaw,
  Revenue,
} from '@/examples/types/types';

export async function fetchCardData() {
  const sql = await getDbClient();
  noStore();
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
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
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to card data.');
  }
}

export async function fetchRevenue(): Promise<Revenue[]> {
  const sql = await getDbClient();

  noStore();

  try {
    // Simulate a slow database query to demonstrate data streaming.
    await new Promise(resolve => setTimeout(resolve, 3000));

    const queryText = 'SELECT * FROM revenue';
    const result = await sql.query(queryText);

    return result.rows as Revenue[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  } finally {
    await sql.end(); // Remember to close the client after the operation.
  }
}

export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  const sql = await getDbClient();
  noStore();

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const queryText = `
        SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        ORDER BY invoices.date DESC
        LIMIT 5
      `;

    const result = await sql.query<LatestInvoiceRaw>(queryText);

    const latestInvoices: LatestInvoice[] = result.rows.map(invoice => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));

    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  } finally {
    await sql.end();
  }
}
