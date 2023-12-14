'use client'

import React, { useEffect, useState } from 'react'
import { apiPost } from '@/utils/api-client'
import { ApiStatus } from '@/services/apiclient'

export default function Cards() {
  const [cardData, setCardData] = useState({
    totalPaidInvoices: 0,
    totalPendingInvoices: 0,
    numberOfInvoices: 0,
    numberOfCustomers: 0,
  })

  useEffect(() => {
    const fetchCardData = async () => {
      const response = await apiPost('/jsonql', { fetchCardData: {} })

      if (response.status === ApiStatus.OK) {
        const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } =
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          response.result.fetchCardData
        setCardData({
          totalPaidInvoices,
          totalPendingInvoices,
          numberOfInvoices,
          numberOfCustomers,
        })
      } else {
        console.error('Error fetching card data:', response)
      }
    }

    fetchCardData().catch(console.error)
  }, [])

  return (
    <>
      <Card title="Collected" value={cardData.totalPaidInvoices} type="collected" />
      <Card title="Pending" value={cardData.totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={cardData.numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={cardData.numberOfCustomers} type="customers" />
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
