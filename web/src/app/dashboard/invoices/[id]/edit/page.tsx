import React from 'react'
import Form from '@/components/examples/invoices/edit-form'
import Breadcrumbs from '@/components/examples/invoices/breadcrumbs'
import { notFound } from 'next/navigation'
import { apiPost } from '@/utils/api-client'
import { ApiStatus } from '@/services/apiclient'
import { SubmitResultType } from '@/types.d'

const fetchInvoiceByIdData = async (id: string) => {
  const invoiceData = await apiPost('/jsonql', {
    fetchInvoiceById: {
      query: id,
    },
  })

  if (invoiceData.status !== ApiStatus.OK) {
    return { text: 'Error logging in', type: SubmitResultType.error }
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { fetchInvoiceById } = invoiceData.result

  return fetchInvoiceById
}

const fetchCustomersData = async () => {
  const customerData = await apiPost('/jsonql', { fetchCustomers: {} })

  if (customerData.status !== ApiStatus.OK) {
    return { text: 'Error logging in', type: SubmitResultType.error }
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { fetchCustomers } = customerData.result

  return fetchCustomers
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id

  const [invoice, customers] = await Promise.all([fetchInvoiceByIdData(id), fetchCustomersData()])

  if (!invoice) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  )
}
