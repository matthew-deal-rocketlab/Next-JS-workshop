import React, { Suspense } from 'react'
import Cards from '@/components/examples/home/cards'
import RevenueChart from '@/components/examples/home/revenue-chart'
import LatestInvoices from '@/components/examples/home/latest-invoices'
import { CardsSkeleton, RevenueChartSkeleton } from '@/components/examples/skeletons'

export default async function Page() {
  return (
    <div>
      <h1 className="mb-4 text-2xl">Example Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* We can use suspense here to do data straming in Next Js, What this means is, the code outside of the suspense boundry
         will load instantly and appear on the users screen, and then the data within the suspense boundry will steam into the UI.  */}
        <Suspense fallback={<CardsSkeleton />}>
          <Cards />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<RevenueChartSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </div>
  )
}
