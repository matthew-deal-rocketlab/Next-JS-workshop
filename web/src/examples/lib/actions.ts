'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { apiPost } from '@/utils/api-client'
import { ApiStatus } from '@/services/apiclient'
import { SubmitResultType } from '@/types.d'

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
})

export interface State {
  errors?: {
    customerId?: string[]
    amount?: string[]
    status?: string[]
  }
  message?: string | null
}

// Use Zod to update the expected types
const CreateInvoice = InvoiceSchema.omit({ id: true, date: true })

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    }
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data
  const amountInCents = amount * 100
  const date = new Date().toISOString().split('T')[0]
  const invoiceId = uuidv4() // Generate a new UUID for the invoice id

  const input = {
    invoiceId,
    customerId,
    amountInCents,
    status,
    date,
  }

  const createInvoiceFetch = await apiPost('/jsonql', {
    createInvoice: {
      input,
    },
  })

  if (createInvoiceFetch.status !== ApiStatus.OK) {
    return { text: 'Error logging in', type: SubmitResultType.error }
  }

  revalidatePath('/example/invoices')
  redirect('/example/invoices')
}

const UpdateInvoice = InvoiceSchema.omit({ date: true, id: true })

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })

  const amountInCents = Number(amount) * 100

  const input = {
    id,
    customerId,
    amountInCents,
    status,
  }

  const updateInvoiceFetch = await apiPost('/jsonql', {
    updateInvoice: {
      input,
    },
  })

  if (updateInvoiceFetch.status !== ApiStatus.OK) {
    return { text: 'Error logging in', type: SubmitResultType.error }
  }

  revalidatePath('/example/invoices')
  redirect('/example/invoices')
}

export async function deleteInvoice(id: string) {
  const deleteInvoiceFetch = await apiPost('/jsonql', {
    deleteInvoice: {
      id,
    },
  })

  if (deleteInvoiceFetch.status !== ApiStatus.OK) {
    return { text: 'Error logging in', type: SubmitResultType.error }
  }

  revalidatePath('/example/invoices')
}
