/* eslint-disable @next/next/no-async-client-component */
'use client'

import React, { useEffect, useState } from 'react'
import { apiPost } from '@/utils/api-client'
import { ApiStatus } from '@/services/apiclient'
import { SubmitResultType } from '@/types.d'

export default function Cards() {
  const [totalPaidInvoices, setTotalPaidInvoices] = useState(0)
  const [totalPendingInvoices, setTotalPendingInvoices] = useState(0)
  const [numberOfInvoices, setNumberOfInvoices] = useState(0)
  const [numberOfCustomers, setNumberOfCustomers] = useState(0)

  useEffect(() => {
    const fetchCardData = async () => {
      const cardData = await apiPost('/jsonql', { fetchCardData: {} })

      if (cardData.status !== ApiStatus.OK) {
        return { text: 'Error logging in', type: SubmitResultType.error }
      }
      const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        cardData?.result?.fetchCardData

      setTotalPaidInvoices(totalPaidInvoices)
      setTotalPendingInvoices(totalPendingInvoices)
      setNumberOfInvoices(numberOfInvoices)
      setNumberOfCustomers(numberOfCustomers)
    }

    void fetchCardData()
  }, [])

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={numberOfCustomers} type="customers" />
    </>
  )
}

export function Card({
  title,
  value,
  type,
}: {
  title: string
  value: number | string
  type: 'invoices' | 'customers' | 'pending' | 'collected'
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">{value}</p>
    </div>
  )
}
