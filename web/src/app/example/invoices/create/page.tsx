'use server'

import Form from '@/components/examples/invoices/create-form'
import Breadcrumbs from '@/components/examples/invoices/breadcrumbs'
import { apiPost } from '@/utils/api-client'
import { ApiStatus } from '@/services/apiclient'
import { SubmitResultType } from '@/types.d'

const fetchCustomersData = async () => {
  const customerData = await apiPost('/jsonql', {
    fetchCustomers: {},
  })

  if (customerData.status !== ApiStatus.OK) {
    return { text: 'Error logging in', type: SubmitResultType.error }
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { fetchCustomers } = customerData?.result

  console.log('fetchCustomers', customerData)

  return fetchCustomers
}

export default async function Page() {
  const customers = await fetchCustomersData()

  console.log('customers', customers)

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/example/invoices' },
          {
            label: 'Create Invoice',
            href: '/example/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  )
}
