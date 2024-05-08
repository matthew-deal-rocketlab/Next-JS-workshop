import LatestInvoices from '@/components/examples/home/latest-invoices'
import { RevenueChartSkeleton } from '@/components/examples/skeletons'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <Suspense fallback={<RevenueChartSkeleton />}>
      <LatestInvoices />
    </Suspense>
  )
}
