import { type LatestInvoice } from '@/examples/types/types'
import { ApiStatus } from '@/services/apiclient'
import { SubmitResultType } from '@/types.d'
import { apiPost } from '@/utils/api-client'
import React from 'react'

const fetchLatestInvoiceData = async () => {
  const invoiceData = await apiPost('/jsonql', { fetchLatestInvoices: {} })

  if (invoiceData.status !== ApiStatus.OK) {
    return { text: 'Error logging in', type: SubmitResultType.error }
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { fetchLatestInvoices } = invoiceData && (invoiceData.result as LatestInvoice[])

  return fetchLatestInvoices
}

export default async function LatestInvoices() {
  const invoices: LatestInvoice[] = await fetchLatestInvoiceData()

  return (
    <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
      <div className="bg-white px-6">
        {invoices?.map((invoice, i) => {
          return (
            <div
              key={invoice.id}
              className={`flex flex-row items-center justify-between py-4 ${
                i !== 0 ? 'border-t' : ''
              }`}>
              <div className="flex items-center">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">{invoice.name}</p>
                  <p className="hidden text-sm text-gray-500 sm:block">{invoice.email}</p>
                </div>
              </div>
              <p className="truncate text-sm font-medium md:text-base">{invoice.amount}</p>
            </div>
          )
        })}
      </div>
      <div className="flex items-center pb-2 pt-6">
        <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
      </div>
    </div>
  )
}
