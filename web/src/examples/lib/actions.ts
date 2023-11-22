'use server';

import getDbClient from './sqlClient';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// Use Zod to update the expected types
const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  const sql = await getDbClient();
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  const invoiceId = uuidv4(); // Generate a new UUID for the invoice id

  try {
    // Use parameterized queries to prevent SQL injection
    const result = await sql.query(
      `INSERT INTO invoices (id, customer_id, amount, status, date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id;`,
      [invoiceId, customerId, amountInCents, status, date], // Provide the parameters as an array
    );
    console.log('Invoice created with ID:', result.rows[0].id);
  } catch (error) {
    console.error('Error inserting invoice:', error);
    throw new Error(
      `Database Error: Failed to Create Invoice. Original error message: ${error}`,
    );
  } finally {
    await sql.end(); // Close the client connection to prevent leaks
  }

  revalidatePath('/example/invoices');
  redirect('/example/invoices');
}

const UpdateInvoice = InvoiceSchema.omit({ date: true, id: true });

export async function updateInvoice(id: string, formData: FormData) {
  const sql = await getDbClient();
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = Number(amount) * 100;

  try {
    await sql.query(
      `UPDATE invoices
       SET customer_id = $1, amount = $2, status = $3
       WHERE id = $4`,
      [customerId, amountInCents, status, id],
    );
  } catch (error) {
    console.error('Error updating invoice:', error);
    throw new Error('Database Error: Failed to Update Invoice.');
  } finally {
    await sql.end();
  }

  revalidatePath('/example/invoices');
  redirect('/example/invoices');
}

export async function deleteInvoice(id: string) {
  const sql = await getDbClient();
  await sql.query(`DELETE FROM invoices WHERE id = $1`, [id]);
  revalidatePath('/example/invoices');
}
