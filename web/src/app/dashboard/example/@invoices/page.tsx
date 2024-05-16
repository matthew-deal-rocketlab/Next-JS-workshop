import LatestInvoices from '@/components/examples/home/latest-invoices'
import { RevenueChartSkeleton } from '@/components/examples/skeletons'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <section className="flex w-full flex-col md:col-span-4 lg:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">Latest Invoices</h2>
      <Suspense fallback={<RevenueChartSkeleton />}>
        <LatestInvoices />
      </Suspense>
    </section>
  )
}
