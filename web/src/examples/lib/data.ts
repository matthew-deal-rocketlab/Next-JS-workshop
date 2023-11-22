import { formatCurrency } from '@/examples/utils/helpers';
import { unstable_noStore as noStore } from 'next/cache';
import getDbClient from './sqlClient';
import {
  CustomerField,
  InvoiceForm,
  InvoicesTable,
  LatestInvoice,
  LatestInvoiceRaw,
  Revenue,
} from '@/examples/types/types';

export async function fetchCardData() {
  const sql = await getDbClient();
  noStore();
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

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const sql = await getDbClient();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql.query(
      `
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
        customers.name ILIKE $1 OR
        customers.email ILIKE $1 OR
        invoices.amount::text ILIKE $1 OR
        invoices.date::text ILIKE $1 OR
        invoices.status ILIKE $1
      ORDER BY invoices.date DESC
      LIMIT $2 OFFSET $3
    `,
      [`%${query}%`, ITEMS_PER_PAGE, offset],
    );

    return invoices.rows as InvoicesTable[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  } finally {
    await sql.end();
  }
}

export async function fetchInvoicesPages(query: string) {
  const sql = await getDbClient();
  noStore();
  try {
    const count = await sql.query(
      `
      SELECT COUNT(*)
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE $1 OR
        customers.email ILIKE $1 OR
        invoices.amount::text ILIKE $1 OR
        invoices.date::text ILIKE $1 OR
        invoices.status ILIKE $1
    `,
      [`%${query}%`],
    );

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    console.log(totalPages);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  } finally {
    await sql.end();
  }
}

export async function fetchInvoiceById(id: string) {
  const sql = await getDbClient();

  const queryText = `
    SELECT
      id,
      customer_id,
      amount,
      status
    FROM invoices
    WHERE id = $1;
  `;

  try {
    const data = await sql.query<InvoiceForm>(queryText, [id]);

    const invoice = data.rows.map(invoice => ({
      ...invoice,
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice by ID.');
  } finally {
    await sql.end();
  }
}

export async function fetchCustomers() {
  const sql = await getDbClient();
  noStore();
  try {
    const result = await sql.query(`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `);

    const customers: CustomerField[] = result.rows;
    return customers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all customers.');
  } finally {
    await sql.end();
  }
}
